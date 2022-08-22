export class UserInfo {
    constructor(userNameSelector, userBioSelector) {
        this._userNameContainer = document.querySelector(userNameSelector);
        this._userBioContainer = document.querySelector(userBioSelector);
        this._avatar = document.querySelector('.profile__avatar');
    }

    getUserInfo() {
        this._userInfo = {
            name: this._userNameContainer.textContent,
            bio: this._userBioContainer.textContent,
        }
        return this._userInfo;
    }

    setUserInfo( {username, bio, avatar} ) {
        this._userNameContainer.textContent = username;
        this._userBioContainer.textContent = bio;
        this._avatar.src = avatar;
    }

    setAvatar(link) {
        this._avatar.src = link;
        return this._avatar;
    }

}