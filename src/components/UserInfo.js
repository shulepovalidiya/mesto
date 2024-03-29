export class UserInfo {
    constructor(userNameSelector, userBioSelector) {
        this._userNameContainer = document.querySelector(userNameSelector);
        this._userBioContainer = document.querySelector(userBioSelector);
        this._avatar = document.querySelector('.profile__avatar');
    }

    getUserInfo() {
        return {
            name: this._userNameContainer.textContent,
            bio: this._userBioContainer.textContent,
        }
    }

    setUserInfo( {username, bio} ) {
        this._userNameContainer.textContent = username;
        this._userBioContainer.textContent = bio;
    }

    setAvatar(link) {
        this._avatar.src = link;

    }

}