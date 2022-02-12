export const state = () => ({
  products: [
    // {
    //   id: 0,
    //   title: 'Xleb',
    //   imageUrl:
    //     'https://www.seriouseats.com/thmb/zt2uPceCGgDY7TjetsQy74LL4aE=/1500x1125/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2011__06__20200419-no-knead-bread-vicky-wasik2-a20f97803cb349e38c2c3fad18f767b5.jpg',
    //   price: 1232,
    // },
  ],
})

export const mutations = {
  pushNewProduct(state, product) {
    state.products.push(product)
  },
  removeProduct(state, id) {
    const itemIndex = state.products.findIndex((el) => el.id === id)
    console.log(itemIndex, state.products)
    state.products.splice(itemIndex, 1)
  },
}

export const actions = {
  addNewProduct({ commit }, product) {
    commit('pushNewProduct', product)
  },
  removeProductById({ commit }, productId) {
    commit('removeProduct', productId)
  },
}

export const getters = {
  getProducts: (s) => s.products,
}
