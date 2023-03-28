/*Редактирование информации о пользователе*/
export default class UserInfo {
  constructor({selectorName, selectorAbout, selectorAvatar}) {
    this._selectorName = document.querySelector(selectorName);
    this._selectorAbout = document.querySelector(selectorAbout);
    this._selectorAvatar = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    return {
      name: this._selectorName.textContent,
      about: this._selectorAbout.textContent
    }
  }

  setUserInfo = ({name, about, avatar}) => {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._selectorName.textContent = this._name;
    this._selectorAbout.textContent = this._about;
    this._selectorAvatar.src = this._avatar;
  }
}




