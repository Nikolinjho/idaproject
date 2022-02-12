<template>
  <div>
    <button class="show-btn" @click="toggleForm"></button>
    <div class="form-wrapper" :class="{ 'form-wrapper_visible': formShow }">
      <form @submit.prevent="addProduct" class="form">
        <div class="form__close" @click="toggleForm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17">
            <path
              fill="#323c46"
              d="M1.897.542L8.65 7.294 15.403.542l1.343 1.343-6.753 6.753 6.753 6.753-1.343 1.343L8.65 9.981l-6.753 6.753-1.343-1.343 6.752-6.753L.554 1.885z"
              opacity=".4"
            />
          </svg>
        </div>
        <div
          class="input-container"
          :class="{
            'input-container_error':
              $v.productTitle.$dirty && !$v.productTitle.required,
          }"
        >
          <div class="input-container__label">
            Наименование товара
            <span class="input-container__asterisk"></span>
          </div>
          <input
            v-model="productTitle"
            type="text"
            class="input-container__input"
            placeholder="Введите наименование товара"
          />
          <div
            class="input-container__error"
            v-if="$v.productTitle.$dirty && !$v.productTitle.required"
          >
            Поле является обязательным
          </div>
        </div>
        <div class="input-container">
          <div class="input-container__label">Описание товара</div>
          <textarea
            v-model="productDescription"
            type="text"
            class="input-container__input input-container__input--area"
            placeholder="Введите описание товара"
          />
        </div>
        <div
          class="input-container"
          :class="{
            'input-container_error':
              $v.productImageLink.$dirty && !$v.productImageLink.required,
          }"
        >
          <div class="input-container__label">
            Ссылка на изображение товара
            <span class="input-container__asterisk"></span>
          </div>
          <input
            v-model="productImageLink"
            type="text"
            class="input-container__input"
            placeholder="Введите ссылку"
          />
          <div
            class="input-container__error"
            v-if="$v.productImageLink.$dirty && !$v.productImageLink.required"
          >
            Поле является обязательным
          </div>
        </div>
        <div
          class="input-container"
          :class="{
            'input-container_error':
              $v.productPrice.$dirty && !$v.productPrice.required,
          }"
        >
          <div class="input-container__label">
            Цена товара
            <span class="input-container__asterisk"></span>
          </div>
          <input
            v-mask="currencyMask"
            v-model="productPrice"
            type="text"
            class="input-container__input"
            placeholder="Введите цену"
          />
          <div
            class="input-container__error"
            v-if="$v.productPrice.$dirty && !$v.productPrice.required"
          >
            Поле является обязательным
          </div>
        </div>
        <div class="input-container">
          <button
            type="submit"
            class="bem-button"
            :class="{ 'bem-button--green': !$v.$invalid }"
          >
            Добавить товар
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { required } from 'vuelidate/lib/validators'

const currencyMask = createNumberMask({
  prefix: '',
  allowDecimal: false,
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ' ',
  allowNegative: false,
})

export default {
  name: 'FormSection',
  data() {
    return {
      productIdSuffix: 'product-',
      productTitle: '',
      productDescription: '',
      productImageLink: '',
      productPrice: '',
      currencyMask,
      formShow: false,
    }
  },
  validations: {
    productTitle: {
      required,
    },
    productImageLink: {
      required,
    },
    productPrice: {
      required,
    },
  },
  methods: {
    addProduct() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const newProduct = {
        id: this.productIdSuffix + (new Date()).getTime().toString(16),
        title: this.productTitle,
        imageUrl: this.productImageLink,
        price: this.productPrice,
      }

      this.$store.dispatch('prods/addNewProduct', newProduct)
      this.$notify({
        title: 'Продукт добавлен',
        type: 'success',
      })
    },
    toggleForm() {
      this.formShow = !this.formShow
      if (!this.formShow) this.$v.$reset()
    },
  },
}
</script>

<style lang="scss" scoped>



.show-btn {
  display: none;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 9;
  outline: none;
  border: none;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  &::before {
    content: '+';
    font-size: 45px;
    color: #7bae73;
  }
}
.form {
  background: #fffefb;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
    0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  padding: 8px 24px 24px;
  width: 332px;
  &__close {
    display: none;
  }
}

.input-container {
  margin-top: 16px;
  position: relative;
  &_error {
    .input-container__input {
      border: 1px solid #ff8484;
    }
  }
  &__label {
    display: inline-block;
    font-size: 10px;
    line-height: 13px;
    color: #49485e;
    position: relative;
  }
  &__asterisk {
    position: absolute;
    right: -4px;
    width: 4px;
    height: 4px;
    background: #ff8484;
    border-radius: 50%;
  }
  &__input {
    margin-top: 4px;
    outline: none;
    border: none;
    background: #fffefb;
    width: 100%;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 10px 16px 11px;
    font-size: 12px;
    line-height: 15px;
    color: #3f3f3f;
    &--area {
      min-height: 108px;
      resize: none;
    }

    &::placeholder {
      color: #b4b4b4;
    }
  }
  &__error {
    position: absolute;
    top: calc(100% + 4px);
    font-size: 8px;
    line-height: 10px;
    color: #ff8484;
  }
}

.bem-button {
  background: #eeeeee;
  border-radius: 10px;
  width: 100%;
  outline: none;
  border: none;
  padding: 10px 0 11px;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #b4b4b4;
  cursor: pointer;
  &--green {
    background: #7bae73;
    color: #fff;
  }
}

@media screen and (min-width: 1025px) {
  .form-wrapper {
    position: sticky;
    top: 10px;
  }
}

@media screen and (max-width: 1024px) {
  .show-btn {
    display: block;
  }
  .form {
    background: #fffefb;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
      0px 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;
    padding: 0 30px 25px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    &-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      background: #fffefb;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.25s ease, visibility 0.25s ease,
        transform 0.35s ease;
      transform: scale(0.6);
      &_visible {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
      }
    }
    &__close {
      position: absolute;
      top: 25px;
      right: 20px;
      width: 21px;
      height: 21px;
      display: block;
      z-index: 10;
    }
  }
  .input-container {
    margin-top: 45px;
    &:last-child {
      flex-grow: 1;
      display: flex;
      align-items: flex-end;
    }
    &__label {
      font-size: 16px;
      line-height: 19px;
    }
    &__asterisk {
      right: -6px;
      width: 6px;
      height: 6px;
    }
    &__input {
      margin-top: 14px;
      border-radius: 8px;
      padding: 15px 16px 16px;
      font-size: 18px;
      line-height: 21px;

      &::placeholder {
        color: #b4b4b4;
        font-size: 18px;
        line-height: 21px;
      }
    }
    &__error {
      top: calc(100% + 8px);
      font-size: 12px;
      line-height: 14px;
    }
  }
}
</style>
