import './index.css';
import { initialCards } from "../utils/initial-cards.js";
import { Card } from "../components/Card.js";
import { FormValidator, validationSettings } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { Section } from "../components/Section";
import { UserInfo } from "../components/UserInfo";

const userInfo = new UserInfo('.profile__username', '.profile__bio');
const userData = userInfo.getUserInfo();

const popupWithImage = new PopupWithImage('.popup_picture-view');
popupWithImage.setEventListeners();

const popupWithEditForm = new PopupWithForm('.popup_type_edit-profile', {
    submitHandler: (inputValues) => {
        userInfo.setUserInfo(inputValues);
        popupWithEditForm.close();
    }
}, );
popupWithEditForm.setEventListeners();

const popupWithAddCardForm = new PopupWithForm('.popup_type_add-card', {
    submitHandler: (inputValues) => {
        const card = new Card({name: inputValues['place-name'], link: inputValues['picture-link']}, '.places-template', handleCardClick);
        const renderedCard = card.generateCard();
        cardsSection.addItem(renderedCard);
    }
});
popupWithAddCardForm.setEventListeners();

const editProfileForm = document.querySelector('.popup__form_type_edit');
const editProfileFormUsername = document.querySelector('#name-field');
const editProfileFormUserBio = document.querySelector('#bio-field');
const editProfileOpenButton = document.querySelector('.profile__edit-button');

const addNewCardOpenButton = document.querySelector('.profile__add-button');
const addNewCardForm = document.querySelector('.popup__form_type_add-card');

const cardsSection = new Section ({
    items: initialCards,
    renderer: (item) => {
        const newCard = new Card(item, '.places-template', handleCardClick);
        const renderedCard = newCard.generateCard();
        cardsSection.addItem(renderedCard);
    }
}, '.places__cards');
cardsSection.renderItems();

function handleCardClick(name, link) {
    popupWithImage.open(name, link)
}

const editProfileFormValidated = new FormValidator(validationSettings, editProfileForm);
editProfileFormValidated.enableValidation();

const addNewCardFormValidated = new FormValidator(validationSettings, addNewCardForm);
addNewCardFormValidated.enableValidation();

editProfileOpenButton.addEventListener('click', function () {
    popupWithEditForm.open();
    editProfileFormUsername.setAttribute('value', userData.name);
    editProfileFormUserBio.setAttribute('value', userData.bio);
    editProfileFormValidated.resetValidation();
});

addNewCardOpenButton.addEventListener('click', function () {
    popupWithAddCardForm.open();
    addNewCardFormValidated.resetValidation();
});




