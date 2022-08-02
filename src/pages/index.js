import './index.css';
import { initialCards } from "../utils/initial-cards.js";
import { validationSettings } from "../utils/validationSettings";
import { editProfileConfig, addNewCardConfig } from "../utils/constants";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { Section } from "../components/Section";
import { UserInfo } from "../components/UserInfo";

const userInfo = new UserInfo('.profile__username', '.profile__bio');

const popupWithImage = new PopupWithImage('.popup_picture-view');
popupWithImage.setEventListeners();

const popupWithEditForm = new PopupWithForm('.popup_type_edit-profile', {
    submitHandler: (inputValues) => {
        userInfo.setUserInfo(inputValues);
        popupWithEditForm.close();
    }
}, );
popupWithEditForm.setEventListeners();

function createNewCard(cardData) {
    const card = new Card (cardData, '.places-template', handleCardClick);
    const renderedCard = card.generateCard();
    return renderedCard;
}

const popupWithAddCardForm = new PopupWithForm('.popup_type_add-card', {
    submitHandler: (inputValues) => {
        cardsSection.addItem(createNewCard(inputValues));
    }
});
popupWithAddCardForm.setEventListeners();

const cardsSection = new Section ({
    items: initialCards,
    renderer: (item) => {
        cardsSection.addItem(createNewCard(item));
    }
}, '.places__cards');
cardsSection.renderItems();

function handleCardClick(name, link) {
    popupWithImage.open(name, link)
}

const editProfileFormValidated = new FormValidator(validationSettings, editProfileConfig.form);
editProfileFormValidated.enableValidation();

const addNewCardFormValidated = new FormValidator(validationSettings, addNewCardConfig.form);
addNewCardFormValidated.enableValidation();

editProfileConfig.openButton.addEventListener('click', function () {
    popupWithEditForm.open();
    const currentUserData = userInfo.getUserInfo();
    editProfileConfig.nameField.setAttribute('value', currentUserData.name);
    editProfileConfig.bioField.setAttribute('value', currentUserData.bio);
    editProfileFormValidated.resetValidation();
});

addNewCardConfig.openButton.addEventListener('click', function () {
    popupWithAddCardForm.open();
    addNewCardFormValidated.resetValidation();
});




