import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor( popupSelector, { submitHandler } ) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._inputList = Array.from(this._formElement.querySelectorAll('.popup__field'));
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        })
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}