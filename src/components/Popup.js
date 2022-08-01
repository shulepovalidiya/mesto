export class Popup {
    constructor( popupSelector ) {
        this._popupCommonClass = 'popup';
        this._popupElement = document.querySelector(popupSelector);
        this._popupHiddenClass = 'popup_hidden';
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
        this._handleButtonClose = this._handleButtonClose.bind(this);
    }

    close() {
        this._popupElement.classList.add(this._popupHiddenClass);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    open() {
        this._popupElement.classList.remove(this._popupHiddenClass)
        document.addEventListener('keydown', this._handleEscClose)
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            if (!this._popupElement.classList.contains(this._popupHiddenClass)) {
                this.close();
            }
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains(this._popupCommonClass)) {
            this.close();
        }
    }

    _handleButtonClose(evt) {
        if (evt.target.classList.contains('popup__close-button')) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener('click', this._handleOverlayClose)
        this._popupElement.addEventListener('click', this._handleButtonClose)
    }
}