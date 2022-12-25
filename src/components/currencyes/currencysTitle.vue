<template>
    <div class="currencies-title">
        <h3 class="currencies-title__title">Основная валюта: </h3>
        <select name="valute" id="valute" v-model="selectCurrency" class="currencies-title__select">
          <option>RUB</option>
          <option  v-for="item of valute" :key="item.ID">{{ item.CharCode }}</option>
        </select>
    </div>
</template>

<script>

export default {
  name: "currencysTitle",
  props: {
    valute: {
      required: true,
      type: Object,
      default: {}
    },
    modelValue: {
      required: true,
      type: String,
      default: "RUB"
    }
  },
  computed: {
    selectCurrency: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<style lang="scss">

.currencies-title {
    display: flex;
    align-items: center;
    justify-content: center;

    &__title {
      margin-right: 10px;
    }

    &__select {
      border-radius: 4px;
      height: 30px;
      width: 100px;
      padding: 0 5px;
      border: 1px solid gray;
      box-shadow: 0px 0px 10px rgb(179 187 198 / 45%);
    }
  }

</style>
