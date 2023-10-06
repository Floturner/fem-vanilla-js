import Router from './services/Router.js';
import Store from './services/Store.js';
import API from './services/API.js';
import { loadData } from './services/Menu.js';

// Web Components Imports
import MenuPage from './components/MenuPage.js';
import DetailsPage from './components/DetailsPage.js';
import OrderPage from './components/OrderPage.js';
import ProductItem from './components/ProductItem.js';
import CartItem from './components/CartItem.js';

window.app = {
  store: Store,
  router: Router,
};

// const $ = () => document.querySelector.call(this, arguments);
// const $$ = () => document.querySelectorAll.call(this, arguments);
// HTMLElement.prototype.on = () => this.addEventListener.call(this, arguments);
// HTMLElement.prototype.off = () =>
//   this.removeEventListener.call(this, arguments);
// HTMLElement.prototype.$ = () => this.querySelector.call(this, arguments);
// HTMLElement.prototype.$ = () => this.querySelectorAll.call(this, arguments);

window.addEventListener('DOMContentLoaded', () => {
  app.router.init();
  loadData();
});

navigator.serviceWorker.register('/serviceworker.js');

window.addEventListener('appcartchange', () => {
  const badge = document.getElementById('badge');
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});
