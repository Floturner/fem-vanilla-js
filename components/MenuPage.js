export default class MenuPage extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    const template = document.getElementById('menu-page-template');
    const content = template.content.cloneNode(true);
    const styles = document.createElement('style');
    this.root.appendChild(content);
    this.root.appendChild(styles);

    loadCSS();

    async function loadCSS() {
      const request = await fetch('/components/MenuPage.css');
      styles.textContent = await request.text();
    }
  }

  connectedCallback() {
    this.render();
    window.addEventListener('appmenuchange', () => {
      this.render();
    });
  }

  render() {
    const menu = this.root.querySelector('#menu');
    if (app.store.menu) {
      menu.innerHTML = '';
      for (let category of app.store.menu) {
        const liCategory = document.createElement('li');
        liCategory.innerHTML = `
          <h3>${category.name}</h3>
          <ul class='category'></ul>
        `;
        menu.appendChild(liCategory);

        category.products.forEach((product) => {
          const item = document.createElement('product-item');
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector('ul').appendChild(item);
        });
      }
    } else {
      menu.innerHTML = 'Loading...';
    }
  }
}

customElements.define('menu-page', MenuPage);
