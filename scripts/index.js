//попап изменения данных профиля
const editProfileOpenButton = document.querySelector('.profile__edit-button');
const editProfileCloseButton = document.querySelector('.popup__edit-close-button');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileForm = document.querySelector('.popup__form_type_edit');
const editProfileFormUsername = document.querySelector('#name-field');
const editProfileFormUserBio = document.querySelector('#bio-field');
const profileUsername = document.querySelector('.profile__username')
const profileBio = document.querySelector('.profile__bio')

//попап добавления новой карточки
const addNewCardOpenButton = document.querySelector('.profile__add-button');
const addNewCardCloseButton = document.querySelector('.popup__add-card-close-button');
const addNewCardPopup = document.querySelector('.popup_type_add-card');
const addNewCardForm = document.querySelector('.popup__form_type_add-card');

//попап с полноразмерной картинкой
const popupFullSizePicture = document.querySelector('.popup_picture-view');
const popupFullSizePictureCloseButton = document.querySelector('.popup__picture-close-button');

const popupList = document.querySelectorAll('.popup');

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

function hidePopupByEscape(evt) {
    if (evt.key === 'Escape') {
        popupList.forEach((popup) => {
            if (!popup.classList.contains('popup_hidden')) {
                hidePopup(popup);
            }
        });
    }
}

popupList.forEach((popup) => {
    hidePopupByOverlayClick(popup);
    hidePopupByCloseButton(popup);
});

editProfileOpenButton.addEventListener('click', function () {
    showPopup(editProfilePopup);
    editProfileFormUsername.setAttribute('value', profileUsername.textContent);
    editProfileFormUserBio.setAttribute('value', profileBio.textContent);
    editProfileForm.reset();
    getFormElementsAndToggleButton(editProfileForm);

});

addNewCardOpenButton.addEventListener('click', function () {
    showPopup(addNewCardPopup);
    addNewCardForm.reset();
    getFormElementsAndToggleButton(addNewCardForm);
});

function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();
    profileUsername.textContent = editProfileFormUsername.value;
    profileBio.textContent = editProfileFormUserBio.value;
    hidePopup(editProfilePopup);
};

editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);

const placesCardTemplate = document.querySelector('.places-template').content;
const placesCardsContainer = document.querySelector('.places__cards');

function createNewCard(placeName, placeLink) {
    const placesCard = placesCardTemplate.cloneNode(true);
    const cardImage = placesCard.querySelector('.places__image');
    const cardName = placesCard.querySelector('.places__name');
    const cardLikeButton = placesCard.querySelector('.places__like-button');
    const cardDeleteButton = placesCard.querySelector('.places__delete-button');

    cardImage.src = placeLink;
    cardImage.alt = placeName;
    cardName.textContent = placeName;

    cardLikeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('places__like-button_active');
    });

    cardDeleteButton.addEventListener('click', function () {
        const cardToRemove = cardDeleteButton.closest('.places__card');
        cardToRemove.remove();
    });

    cardImage.addEventListener('click', function () {
        document.querySelector('.popup__image').src = placeLink;
        document.querySelector('.popup__image').alt = placeName;
        document.querySelector('.popup__image-caption').textContent = placeName;
        showPopup(popupFullSizePicture);
    });

    return placesCard;
};

initialCards.forEach(function (card) {
    const newCard = createNewCard(card.name, card.link);
    placesCardsContainer.append(newCard);
});

function addCardToContainer(evt) {
    evt.preventDefault();
    const inputCardName = document.querySelector('#place-name-field').value;
    const inputCardPictureLink = document.querySelector('#picture-link-field').value;
    const newCard = createNewCard(inputCardName, inputCardPictureLink);
    placesCardsContainer.prepend(newCard);
    hidePopup(addNewCardPopup);
};

addNewCardForm.addEventListener('submit', addCardToContainer);



