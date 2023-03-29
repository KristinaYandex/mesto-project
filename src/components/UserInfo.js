/*Редактирование информации о пользователе*/
export default class UserInfo {
  constructor(selectorName, selectorAbout, selectorAvatar, selesctorId) {
    this.selectorName = document.querySelector(selectorName);
    this.selectorAbout = document.querySelector(selectorAbout);
    this.selectorAvatar = document.querySelector(selectorAvatar);
    this.selesctorId = selesctorId;
  }
  getUserInfo() {
    return {
      name: this.selectorName.textContent,
      about: this.selectorAbout.textContent,
      avatar: this.selectorAvatar.textContent
    }
  }
  setUserInfo({name, about, avatar}, _id) {
    this.selectorName.textContent = name;
    this.selectorAbout.textContent = about;
    this.selectorAvatar.src = avatar;
    this.selesctorId = _id;
  }
}
