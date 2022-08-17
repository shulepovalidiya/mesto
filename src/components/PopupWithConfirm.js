import {Popup} from "./Popup";

export class PopupWithConfirm extends Popup {
    constructor(popupSelector, { submitHandler }) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._formElement = this._popupElement.querySelector('.popup__form');
    }

    open(cardID, cardElement) {
        super.open();
        this._cardID = cardID;
        this._cardToDelete = cardElement;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._cardID, this._cardToDelete);
            this.close();
        })
    }
}