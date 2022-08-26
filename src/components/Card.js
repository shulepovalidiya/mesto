export class Card {

    constructor(cardData, currentUserID, templateSelector, handlers) {
        this._cardData = cardData;
        this._name = cardData.name;
        this._link = cardData.link;
        this._likes = cardData.likes;
        this._likeAmount = cardData.likes.length;
        this._templateSelector = templateSelector;
        this._handleCardClick = handlers.handleCardClick;
        this._handleDeleteBtnClick = handlers.handleDeleteBtnClick;
        this._ownerID = currentUserID;
        this._isCardMine = cardData.owner._id === this._ownerID;
        this._cardID = cardData._id;
        this._likeHandler = handlers.handleLike;
        this._deleteLikeHandler = handlers.handleDelete;
    }


    _getTemplate() {
        const cardTemplate = document.querySelector(`${this._templateSelector}`).content.querySelector('.places__card').cloneNode(true);
        return cardTemplate;
    }


    _isCardLiked() {
        const isLiked = this._likes.find(like => like._id === this._ownerID);
        return isLiked;
    }

    _updateLikeCounter(updatedLikes) {
        this._likes = updatedLikes;
        this._cardLikeCounter.textContent = this._likes.length;
    }


    _handleLike() {
        this._likeHandler(this._cardData, (updatedLikes) => {
            this._updateLikeCounter(updatedLikes);
            this._likeButton.classList.add('places__like-button_active');
        });
    }


    _handleDeleteLike() {
        this._deleteLikeHandler(this._cardData, (updatedLikes) => {
            this._updateLikeCounter(updatedLikes);
            this._likeButton.classList.remove('places__like-button_active');
        })
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

        this._likeButton.addEventListener('click', () => {
            if (this._isCardLiked()) {
                this._handleDeleteLike();
            } else {
                this._handleLike();
            }
        })

        if (this._isCardMine) {
            this._deleteButton.addEventListener('click', (evt) => {
                this._handleDeleteBtnClick(this._cardID, this._cardTemplate);
            })
        }
    }
}
