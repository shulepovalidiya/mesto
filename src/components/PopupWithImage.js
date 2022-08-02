import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = document.querySelector('.popup__image');
        this._popupCaption = document.querySelector('.popup__image-caption');
    }

    open(caption, imageLink) {
        this._popupImage.src = imageLink;
        this._popupImage.alt = caption;
        this._popupCaption.textContent = caption;
        super.open();
    }
}