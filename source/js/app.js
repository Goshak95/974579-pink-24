class AppClass {
  init() {
    this.addMenuHandler();
    this.showInteractiveMap();
  }

  addMenuHandler() {
    const menu = document.querySelector('.main-nav');
    const menuButton = document.querySelector('.main-nav__button');
    menuButton.addEventListener('click', () => {
      menu.classList.toggle('main-nav--closed');
    });
  }

  showInteractiveMap() {
    const map = document.querySelector('.map');
    map.classList.toggle('map--interactive');
  }
}

const App = new AppClass();

window.addEventListener('load', () => {
  App.init();
})
