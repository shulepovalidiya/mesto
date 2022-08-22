import './index.css';
import { validationSettings } from "../utils/validationSettings";
import { userInfoConfig, newCardConfig } from "../utils/constants";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { PopupWithConfirm } from "../components/PopupWithConfirm";
import { Section } from "../components/Section";
import { UserInfo } from "../components/UserInfo";
import { apiConfig } from "../utils/apiConfig";
import { Api } from "../components/Api";

const api = new Api(apiConfig);

const userInfo = new UserInfo('.profile__username', '.profile__bio');

//загружаем с сервера данные пользователя и отображаем их на странице
function updateUserData() {
    api.getUserData()
        .then(data => {
            userInfo.setUserInfo({
                username: data.name,
                bio: data.about,
                avatar: data.avatar})
        })
        .catch(err => {
            console.log(`Произошла ошибка: ${err}`);
        })
}

updateUserData();

//создаём секцию с карточками
const cardsSection = new Section ({
    renderer: (item) => {
        cardsSection.addItem(createNewCard(item));
    }
    }, '.places__cards');

//рендерим карточки с сервера
api.getInitialCards()
    .then(res => {
        cardsSection.renderItems(res);
    })
    .catch(err => {
        console.log(`Произошла ошибка: ${err}`);
    })

//создаём экземпляры попапов
const popupWithImage = new PopupWithImage('.popup_picture-view');
popupWithImage.setEventListeners();

const popupWithUpdateAvatarForm = new PopupWithForm('.popup_type_update-avatar', {
    submitHandler: (inputValues) => {
        popupWithUpdateAvatarForm.handleSavingData();
        api.updateAvatar(inputValues['avatar-link'])
            .then(res => {
            userInfo.setAvatar(res);
            updateUserData();
            })
            .then(res => popupWithUpdateAvatarForm.handleDataSaved());
    }
})
popupWithUpdateAvatarForm.setEventListeners();

const popupWithEditForm = new PopupWithForm('.popup_type_edit-profile', {
    submitHandler: (inputValues) => {
        popupWithEditForm.handleSavingData();
        api.setUserData(inputValues)
            .then(res => {
                userInfo.setUserInfo(res);
                updateUserData();
            })
            .catch(err => console.log(`Произошла ошибка: ${err}`))
            .finally(res => popupWithEditForm.handleDataSaved())
    }
}
);
popupWithEditForm.setEventListeners();

const popupWithAddCardForm = new PopupWithForm('.popup_type_add-card', {
    submitHandler: (inputValues) => {
        api.createNewCard(inputValues).then(inputValues => {
            cardsSection.addItem(createNewCard(inputValues));
        })
    }
});
popupWithAddCardForm.setEventListeners();

const popupWithConfirmation = new PopupWithConfirm ('.popup_type_confirm-deletion', {
    submitHandler: (cardID, cardElement) => {
        api.deleteCard(cardID).then(cardElement.remove());
    },
});
popupWithConfirmation.setEventListeners();

//создание новой карточки
function createNewCard(cardData) {
    const card = new Card (cardData, '.places-template', {
        handleCardClick: (name, link) => {
            popupWithImage.open(name, link);
        },
        handleDeleteBtnClick: (cardID, cardElement) => {
            popupWithConfirmation.open(cardID, cardElement);
        },
        handleLike: (currentCardData, likeCallback) => {
            api.putLike(currentCardData._id).then((updatedCard) => likeCallback(updatedCard.likes))
        },
        handleDelete: (currentCardData, deleteCallback) => {
            api.removeLike(currentCardData._id).then((updatedCard) => deleteCallback(updatedCard.likes))
        }
    })
    const renderedCard = card.generateCard();
    return renderedCard;
}

//валидируем формы
const editProfileFormValidated = new FormValidator(validationSettings, userInfoConfig.editUserDataform);
editProfileFormValidated.enableValidation();

const addNewCardFormValidated = new FormValidator(validationSettings, newCardConfig.form);
addNewCardFormValidated.enableValidation();

const updateAvatarFormValidated = new FormValidator(validationSettings, userInfoConfig.updateAvatarForm);
updateAvatarFormValidated.enableValidation();

//добавляем слушатели событий на кнопки открытия попапов
userInfoConfig.openButton.addEventListener('click', function () {
    popupWithEditForm.open();
    const currentUserData = userInfo.getUserInfo();
    userInfoConfig.nameField.setAttribute('value', currentUserData.name);
    userInfoConfig.bioField.setAttribute('value', currentUserData.bio);
    editProfileFormValidated.resetValidation();
});

newCardConfig.openButton.addEventListener('click', function () {
    popupWithAddCardForm.open();
    addNewCardFormValidated.resetValidation();
});

userInfoConfig.avatar.addEventListener('click', () => {
    popupWithUpdateAvatarForm.open();
    updateAvatarFormValidated.resetValidation();
})




