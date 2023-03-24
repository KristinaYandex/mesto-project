/*Редактирование информации о пользователе*/
class UserInfo {
  constructor(selectorName, selectorAbout, selectorAvatar, selesctorId) {
    this.selectorName = document.querySelector(selectorName);
    this.selectorAbout = document.querySelector(selectorAbout);
    this.selectorAvatar = document.querySelector(selectorAvatar);
    this.selesctorId = selesctorId;
  }
  getUserInfo() {
    return {
      name: this.selectorName.textContent,
      about: this.selectorAbout.textContent
    }
  }
  setUserInfo({name, about, avatar}, id) {
    this.selectorName.textContent = name;
    this.selectorAbout.textContent = about;
    this.selectorAvatar.src = avatar;
    this.selesctorId = id;
  }
}




