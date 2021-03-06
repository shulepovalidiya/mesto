import { initialCards } from "./initial-cards.js";
import { Card } from "./Card.js";
import { FormValidator, validationSettings } from "./FormValidator.js";

const editProfileOpenButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileForm = document.querySelector('.popup__form_type_edit');
const editProfileFormUsername = document.querySelector('#name-field');
const editProfileFormUserBio = document.querySelector('#bio-field');
const profileUsername = document.querySelector('.profile__username')
const profileBio = document.querySelector('.profile__bio')

const addNewCardOpenButton = document.querySelector('.profile__add-button');
const addNewCardPopup = document.querySelector('.popup_type_add-card');
const addNewCardForm = document.querySelector('.popup__form_type_add-card');

const popupList = document.querySelectorAll('.popup');

const popupPicture = document.querySelector('.popup_picture-view');

const inputName = document.querySelector('#place-name-field');
const inputPictureLink = document.querySelector('#picture-link-field');

function hidePopupByEscape(evt) {
    if (evt.key === 'Escape') {
        popupList.forEach((popup) => {
            if (!popup.classList.contains('popup_hidden')) {
                hidePopup(popup);
            }
        });
    }
}

const showPopup = (popup) => {
    popup.classList.remove('popup_hidden');
    document.addEventListener('keydown', hidePopupByEscape);
};

const hidePopup = (popup) => {
    popup.classList.add('popup_hidden');
    document.removeEventListener('keydown', hidePopupByEscape);
};

const hidePopupByOverlayClick = (popup) => {
    popup.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup')) {
            hidePopup(popup);
        };
    });
};

const hidePopupByCloseButton = (popup) => {
    popup.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup__close-button')) {
            hidePopup(popup);
        };
    });
};

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__image-caption');

function handleCardClick(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    showPopup(popupPicture);
}


popupList.forEach((popup) => {
    hidePopupByOverlayClick(popup);
    hidePopupByCloseButton(popup);
});

const editProfileFormValidated = new FormValidator(validationSettings, editProfileForm);
editProfileFormValidated.enableValidation();

const addNewCardFormValidated = new FormValidator(validationSettings, addNewCardForm);
addNewCardFormValidated.enableValidation();

editProfileOpenButton.addEventListener('click', function () {
    showPopup(editProfilePopup);
    editProfileFormUsername.setAttribute('value', profileUsername.textContent);
    editProfileFormUserBio.setAttribute('value', profileBio.textContent);
    editProfileFormValidated.resetValidation();
});

addNewCardOpenButton.addEventListener('click', function () {
    showPopup(addNewCardPopup);
    addNewCardFormValidated.resetValidation();
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileUsername.textContent = editProfileFormUsername.value;
    profileBio.textContent = editProfileFormUserBio.value;
    hidePopup(editProfilePopup);
};

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

const placesCardsContainer = document.querySelector('.places__cards');

function createNewCard(item) {
    const newCard = new Card(item, '.places-template', handleCardClick);
    const newCardElement = newCard.generateCard();
    return newCardElement;
};

initialCards.forEach((item) => {  
    const newCard = createNewCard(item);
    placesCardsContainer.append(newCard);
});


function addCardToContainer(evt) {
    evt.preventDefault();
    const inputCardName = inputName.value;
    const inputCardPictureLink = inputPictureLink.value;
    const cardData = {
        name: inputCardName,
        link: inputCardPictureLink,
    }
    placesCardsContainer.prepend(createNewCard(cardData));
    addNewCardFormValidated.resetValidation();
    hidePopup(addNewCardPopup);
};

addNewCardForm.addEventListener('submit', addCardToContainer);



