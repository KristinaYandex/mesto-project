import Popup from "./Popup";


export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageText = this._popup.querySelector('.popup__description');
        this._increasedImagePopup= this._popup.querySelector('.popup__image');
    }

    open(name, link) {
        super.open();
        this._name = name;
        this._link = link;
        this._imageText.textContent = this._name;
        this._increasedImagePopup.alt = this._name;
        this._increasedImagePopup.src = this._link;
    }
}
