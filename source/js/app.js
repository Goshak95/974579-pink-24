class AppClass {
  init() {
    this.addMenuHandler();
    this.removeNoJsHeaderState();

    if (document.location.pathname === '/index.html') {
      this.showInteractiveMap();
      this.addTableButtonsHandler();
    }
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

  addTableButtonsHandler() {
    const pricesList = document.querySelector('.prices__list');
    const pricesControls = document.querySelectorAll('.prices__controls > .control-button');

    pricesControls.forEach((button, index, arr) => {
      button.addEventListener('click', () => {
        // pricesList.style.setProperty('transform', `translateX: ${index * -(100 / arr.length)}%`);
        pricesList.classList = 'prices__list';
        pricesList.classList.add(`prices__list--state-${index}`);

        arr.forEach((control) => control.classList.remove('control-button--active'));
        button.classList.add('control-button--active');
      });
    })
  }

  removeNoJsHeaderState() {
    const header = document.querySelector('.page-header');
    header.classList.remove('page-header--no-js');
  }
}

const App = new AppClass();

window.addEventListener('load', () => {
  App.init();
})
