export default class Section{
  constructor({ renderer }, selector) {
      this._renderer = renderer;
      this._container = document.querySelector(selector);
    }
    //Отрисовка
    renderItems(items, userId) {
      items.forEach(item => {this._appendItem(this._renderer(item, userId))});
    }
    //Добавление
    _appendItem(element) {
      this._container.append(element);
    }
    _prependItem(element) {
      this._container.prepend(element);
    }
    renderItem(item, userId) {
      this._prependItem(this._renderer(item, userId));
    }
}


