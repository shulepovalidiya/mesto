import './index.css';
import { validationSettings } from "../utils/validationSettings";
import { userInfoConfig, newCardConfig } from "../utils/constants";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { Section } from "../components/Section";
import { UserInfo } from "../components/UserInfo";
import { apiConfig } from "../utils/apiConfig";
import { PopupWithConfirm } from "../components/PopupWithConfirm";
import { Api } from "../components/Api";

const api = new Api(apiConfig);

const userInfo = new UserInfo('.profile__username', '.profile__bio');

api.getUserData().then(data => userInfo.setUserInfo({
    username: data.name,
    bio: data.about,
    avatar: data.avatar,
}));

const cardsSection = new Section ({
    renderer: (item) => {
        cardsSection.addItem(createNewCard(item));
    }
    }, '.places__cards');

api.getInitialCards()
    .then(res => {cardsSection.renderItems(res);
    console.log(res)});

const popupWithImage = new PopupWithImage('.popup_picture-view');
popupWithImage.setEventListeners();

const popupWithEditForm = new PopupWithForm('.popup_type_edit-profile', {
    submitHandler: (inputValues) => {
        api.setUserData(inputValues).then(inputValues => {
            userInfo.setUserInfo(inputValues);
            popupWithEditForm.close();
        })
    }
}, );
popupWithEditForm.setEventListeners();

function createNewCard(cardData) {
    const card = new Card (cardData, '.places-template', handleCardClick, handleDeleteBtnClick, putLike, removeLike);
    const renderedCard = card.generateCard();
    return renderedCard;
}

const popupWithAddCardForm = new PopupWithForm('.popup_type_add-card', {
    submitHandler: (inputValues) => {
        api.createNewCard(inputValues).then(inputValues => {
            cardsSection.addItem(createNewCard(inputValues));
        })
    }
});
popupWithAddCardForm.setEventListeners();

const deleteCard = (cardID, cardElement) => {
    api.deleteCard(cardID).then(cardElement.remove());
}

const popupWithConfirmation = new PopupWithConfirm ('.popup_type_confirm-deletion', {
    submitHandler: deleteCard,
});
popupWithConfirmation.setEventListeners();

function handleCardClick(name, link) {
    popupWithImage.open(name, link);
}

function putLike(cardID, likeCounter) {
    api.putLike(cardID).then(res => {
        likeCounter.textContent = res.likes.length
    });
}

function removeLike(cardID, likeCounter) {
    api.removeLike(cardID).then(res => likeCounter.textContent = res.likes.length);
}

function handleDeleteBtnClick(cardID, cardElement) {
    popupWithConfirmation.open(cardID, cardElement);
}

const editProfileFormValidated = new FormValidator(validationSettings, userInfoConfig.form);
editProfileFormValidated.enableValidation();

const addNewCardFormValidated = new FormValidator(validationSettings, newCardConfig.form);
addNewCardFormValidated.enableValidation();

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




