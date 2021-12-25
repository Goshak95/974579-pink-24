class AppClass {
  init() {
    this.addMenuHandler();
  }

  addMenuHandler() {
    const menu = document.querySelector('.main-nav');
    menu.addEventListener('click', () => {
      menu.classList.toggle('main-nav--closed');
    });
  }
}

const App = new AppClass();

window.addEventListener('load', () => {
  App.init();
})
