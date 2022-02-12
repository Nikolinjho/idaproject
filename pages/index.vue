<template>
  <div class="page">
    <h1 class="page__title">Добавление товара</h1>
    <div class="page__container">
      <FormSection />
        <transition-group class="products__grid"  tag="div" name="bounce">
          <Product
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  computed: {
    products() {
      return this.$store.getters['prods/getProducts']
    },
  },
}
</script>

<style lang="scss" scoped>


.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0) rotate(-45deg);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.page {
  padding: 32px;
  height: 100%;
  &__title {
    font-weight: 600;
    font-size: 28px;
    line-height: 35px;

    color: #3f3f3f;
  }
  &__container {
    margin-top: 16px;
    display: flex;
  }
}
.products__grid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}

@media screen and (min-width: 768px) {
  .products__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 1024px) {
  .products__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (min-width: 1025px) {
  .products__grid {
    margin-left: 16px;
  }
}
</style>
