const API = {
  url: '/data/menu.json',
  fetchMenu: async function () {
    const res = await fetch(this.url);
    return await res.json();
  },
};

export default API;
