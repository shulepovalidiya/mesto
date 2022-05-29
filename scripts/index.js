let editOpenButton = document.querySelector('.profile__edit-button');
let editCloseButton = document.querySelector('.popup__edit-close-button');
let popup = document.querySelector('.popup');

let editFormUsername = document.querySelector('#username');
let editFormUserBio = document.querySelector('#bio');
let profileUsername = document.querySelector('.profile__username').textContent
let profileBio = document.querySelector('.profile__bio').textContent

let editSaveButton = document.querySelector('.popup__submit-button');

let editForm = document.querySelector('.popup__edit-form');



//открываем поп-ап
editOpenButton.addEventListener('click', function() {
    popup.classList.remove('popup_hidden');
    editFormUsername.setAttribute('value', profileUsername);
    editFormUserBio.setAttribute('value', profileBio); 
});

//закрываем поп-ап
editCloseButton.addEventListener('click', function() {
    popup.classList.add('popup_hidden');
});

function formSubmitHandler (evt) {
    evt.preventDefault();
    let inputUsername = document.querySelector('#username');
    let inputBio = document.querySelector('#bio');
    let profileUsername = document.querySelector('.profile__username');
    let profileBio = document.querySelector('.profile__bio');
    profileUsername.textContent = inputUsername.value;
    profileBio.textContent = inputBio.value;
    popup.classList.add('popup_hidden');
}

editForm.addEventListener('submit', formSubmitHandler); 





