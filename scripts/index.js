//попап изменения данных профиля
const editProfileOpenButton = document.querySelector('.profile__edit-button');
const editProfileCloseButton = document.querySelector('.popup__edit-close-button');
const editProfilePopup = document.querySelector('.popup_edit-profile');
const editProfileForm = document.querySelector('.popup__edit-form');
const editProfileFormUsername = document.querySelector('#username');
const editProfileFormUserBio = document.querySelector('#bio');

//попап добавления новой карточки
const addNewCardOpenButton = document.querySelector('.profile__add-button');
const addNewCardCloseButton = document.querySelector('.popup__add-card-close-button');
const addNewCardPopup = document.querySelector('.popup_add-card');
const addNewCardForm = document.querySelector('.popup__add-card-form');

const profileUsername = document.querySelector('.profile__username').textContent
const profileBio = document.querySelector('.profile__bio').textContent

function showPopup(popup) {
    popup.classList.remove('popup_hidden');
}

function hidePopup(popup) {
    popup.classList.add('popup_hidden');
};

editProfileOpenButton.addEventListener('click', function () {
    showPopup(editProfilePopup);
    editProfileFormUsername.setAttribute('value', profileUsername);
    editProfileFormUserBio.setAttribute('value', profileBio);
});

editProfileCloseButton.addEventListener('click', function() {
    hidePopup(editProfilePopup);
});

addNewCardOpenButton.addEventListener('click', function () {
    showPopup(addNewCardPopup);
});

addNewCardCloseButton.addEventListener('click', function () {
    hidePopup(addNewCardPopup);
});

function editProfileFormSubmitHandler(evt) {
    evt.preventDefault();
    const inputUsername = document.querySelector('#username');
    const inputBio = document.querySelector('#bio');
    const profileUsername = document.querySelector('.profile__username');
    const profileBio = document.querySelector('.profile__bio');
    profileUsername.textContent = inputUsername.value;
    profileBio.textContent = inputBio.value;
    hidePopup(editProfilePopup);
};

editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const placesCardTemplate = document.querySelector('.places-template').content;
const placesCardsContainer = document.querySelector('.places__cards');

initialCards.forEach(function (card) {
    const placesCard = placesCardTemplate.cloneNode(true);
    const cardImage = placesCard.querySelector('.places__image');
    const cardName = placesCard.querySelector('.places__name');
    const cardLikeButton = placesCard.querySelector('.places__like-button');
    const deleteButton = placesCard.querySelector('.places__delete-button');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardName.textContent = card.name;

    cardLikeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('places__like-button_active');
    });

    deleteButton.addEventListener('click', function () {
        const cardToRemove = deleteButton.closest('.places__card');
        cardToRemove.remove();
    });

    cardImage.addEventListener('click', function () {
        const popupFullSizePicture = document.querySelector('.popup_picture-view');
        document.querySelector('.popup__image').src = card.link;
        document.querySelector('.popup__image').alt = card.name;
        document.querySelector('.popup__image-caption').textContent = card.name;
        showPopup(popupFullSizePicture);
    });

    placesCardsContainer.append(placesCard);
});

function addCard(evt) {
    evt.preventDefault();
    const inputCardName = document.querySelector('#place-name');
    const inputCardPictureLink = document.querySelector('#place-picture-link');
    const placesCard = placesCardTemplate.cloneNode(true);
    placesCard.querySelector('.places__image').src = inputCardPictureLink.value;
    placesCard.querySelector('.places__image').alt = inputCardName.value;
    placesCard.querySelector('.places__name').textContent = inputCardName.value;
    placesCard.querySelector('.places__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('places__like-button_active');
    });
    const deleteButton = placesCard.querySelector('.places__delete-button');
    deleteButton.addEventListener('click', function () {
        const cardToRemove = deleteButton.closest('.places__card');
        cardToRemove.remove();
    });

    const cardImage = placesCard.querySelector('.places__image');
    cardImage.addEventListener('click', function () {
        const popupFullSizePicture = document.querySelector('.popup_picture-view');
        document.querySelector('.popup__image').src = inputCardPictureLink.value;;
        document.querySelector('.popup__image').alt = inputCardName.value;
        document.querySelector('.popup__image-caption').textContent = inputCardName.value;
        popupFullSizePicture.classList.remove('popup_hidden');

    });

    placesCardsContainer.prepend(placesCard);

    addNewCardPopup.classList.add('popup_hidden');
};

addNewCardForm.addEventListener('submit', addCard);

const placesCard = placesCardTemplate.cloneNode(true);

const popupFullSizePictureCloseButton = document.querySelector('.popup__picture-close-button');
popupFullSizePictureCloseButton.addEventListener('click', function () {
    const popupFullSizePicture = document.querySelector('.popup_picture-view');
    popupFullSizePicture.classList.add('popup_hidden');
});



