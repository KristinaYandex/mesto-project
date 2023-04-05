/*Редактирование информации о пользователе*/
export default class UserInfo {
  constructor({profileName, profileAbout, profileAvatar}) {
    this._profileName = document.querySelector(profileName);
    this._profileAbout = document.querySelector(profileAbout);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent
    }
  }

  setUserInfo = ({name, about, avatar}) => {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._profileName.textContent = this._name;
    this._profileAbout.textContent = this._about;
    this._profileAvatar.src = this._avatar;
  }
}




