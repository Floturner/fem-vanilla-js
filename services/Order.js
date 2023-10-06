import { getProductById } from './Menu.js';

export function placeOrder() {
  alert(
    'Your order will be ready under the number ' + parseInt(Math.random() * 100)
  );
  app.store.menu = [];
}

export async function addToCart(id) {
  const product = await getProductById(id);
  const results = app.store.cart.filter((cartProduct) => cartProduct.id == id);

  if (results.length == 1) {
    app.store.cart = app.store.cart.map((cartProduct) =>
      cartProduct.product.id == id
        ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
        : cartProduct
    );
  } else {
    app.store.cart = [...app.store.cart, { product, quantity: 1 }];
  }
}

export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter((cartProduct) => cartProduct.id != id);
}
