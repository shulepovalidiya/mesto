export class Api {
    constructor(options) {
        this._url = options.url;
        this._authorization = options.authorization;
    }

    _handleResponse() {

    }

    getUserData() {
        return fetch('https://nomoreparties.co/v1/cohort-48/users/me', {
            headers: {authorization: this._authorization},
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        })
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-48/cards', {
            headers: {
                authorization: this._authorization
            },
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        })
    }

    setUserData(inputValues) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-48/users/me', {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: inputValues.username,
                about: inputValues.bio,
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            })
    }

    createNewCard(inputValues) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-48/cards', {
            method: 'POST',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: inputValues.name,
                link: inputValues.link,
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        })
    }

    deleteCard(cardID) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/${cardID}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if(res.ok) {
                return res.json();
            }
        })
    }

    putLike(cardID) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/${cardID}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        })
    }

    removeLike(cardID) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/cards/${cardID}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        })
    }

    updateAvatar(link) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-48/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: link,
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        })
    }
}