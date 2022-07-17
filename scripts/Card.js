import { cardImage, popupFullSizePicture, popupFullSizePictureCloseButton, hidePopupByEscape } from "./index.js"

export class Card {
    constructor(cardData, templateSelector) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector('.places-template').content.querySelector('.places__card').cloneNode(true);
        return cardTemplate;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.places__image').src = this._link;
        this._element.querySelector('.places__name').textContent = this._name;
        this._element.querySelector('.places__image').alt = this._name;
        return this._element;
    }


    _handleOpenPopup() {
        cardImage.src = this._link;
        document.querySelector('.popup__image-caption').textContent = this._name;
        document.addEventListener('keydown', hidePopupByEscape);
        popupFullSizePicture.classList.remove('popup_hidden');
    }

    _handleClosePopup() {
        cardImage.src = '';
        document.removeEventListener('keydown', hidePopupByEscape);
        popupFullSizePicture.classList.add('popup_hidden');
    }

    _setEventListeners() {
        this._element.querySelector('.places__image').addEventListener('click', () => {
            this._handleOpenPopup();
        });
        popupFullSizePictureCloseButton.addEventListener('click', () => {
            this._handleClosePopup();
        });
        this._element.querySelector('.places__like-button').addEventListener('click', (evt) => {
            evt.target.classList.toggle('places__like-button_active');
        })
        this._element.querySelector('.places__delete-button').addEventListener('click', () => {
            const cardToRemove = this._element.querySelector('.places__delete-button').closest('.places__card');
            cardToRemove.remove();
        })
    }
}

