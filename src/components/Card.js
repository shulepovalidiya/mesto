export class Card {
    constructor(cardData, templateSelector, handleCardClick) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;

    }

    _getTemplate() {
        const cardTemplate = document.querySelector(`${this._templateSelector}`).content.querySelector('.places__card').cloneNode(true);
        return cardTemplate;
    }

    generateCard() {
        this._cardTemplate = this._getTemplate();
        this._cardImage = this._cardTemplate.querySelector('.places__image');
        this._cardName = this._cardTemplate.querySelector('.places__name');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;
        this._likeButton = this._cardTemplate.querySelector('.places__like-button');
        this._deleteButton = this._cardTemplate.querySelector('.places__delete-button');
        this._setEventListeners();
        return this._cardTemplate;
    }

    _toggleLikeButton(evt) {
        evt.target.classList.toggle('places__like-button_active');
    }

    _deleteCard() {
        this._cardTemplate.remove();
        this._cardTemplate = null;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
        this._likeButton.addEventListener('click', (evt) => {
            this._toggleLikeButton(evt);
        })
        this._deleteButton.addEventListener('click', () => {
            this._deleteCard();
        })
    }
}
