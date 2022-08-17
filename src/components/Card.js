export class Card {
    constructor(cardData, templateSelector, handleCardClick, handleDeleteBtnClick, putLike, removeLike) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._likes = cardData.likes;
        this._likeAmount = cardData.likes.length;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteBtnClick = handleDeleteBtnClick;
        this._ownerID = '90d3b5d4c1a246c30cd7425f'
        this._isCardMine = cardData.owner._id === this._ownerID;
        this._cardID = cardData._id;
        this._putLike = putLike;
        this._removeLike = removeLike;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(`${this._templateSelector}`).content.querySelector('.places__card').cloneNode(true);
        return cardTemplate;
    }

    _isCardLiked() {
        const isLiked = this._likes.find(like => like._id === this._ownerID);
        return isLiked;
    }


    generateCard() {
        this._cardTemplate = this._getTemplate();

        this._likeButton = this._cardTemplate.querySelector('.places__like-button');
        this._deleteButton = this._cardTemplate.querySelector('.places__delete-button');
        this._cardImage = this._cardTemplate.querySelector('.places__image');
        this._cardName = this._cardTemplate.querySelector('.places__name');
        this._cardLikeCounter = this._cardTemplate.querySelector('.places__like-counter');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;
        this._cardLikeCounter.textContent = this._likeAmount;

        if (this._isCardLiked()) {
            this._likeButton.classList.add('places__like-button_active');
        }

        if (!this._isCardMine) {
            this._deleteButton.classList.add('popup_hidden')
        }

        this._setEventListeners();
        return this._cardTemplate;
    }


    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });

        this._likeButton.addEventListener('click', (evt) => {
            if (this._isCardLiked()) {
                console.log('Карточка уже лайкнута, снимаем лайк')
                console.log(`Массив лайков: ${this._likes}`);
                this._removeLike(this._cardID, this._cardLikeCounter);
                evt.target.classList.remove('places__like-button_active');
            } else {
                console.log('Карточка ещё пуста, ставим лайк')
                this._putLike(this._cardID, this._cardLikeCounter);
                evt.target.classList.add('places__like-button_active');
            }
        })

        if (this._isCardMine) {
            this._deleteButton.addEventListener('click', (evt) => {
                this._handleDeleteBtnClick(this._cardID, this._cardTemplate);
            })
        }
    }
}
