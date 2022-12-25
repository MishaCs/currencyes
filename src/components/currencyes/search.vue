<template>
    <label class="currencies-search">
        <p class="currencies-search__text">
            Поиск: 
        </p>
        <input type="text" class="currencies-search__input" v-model="search" placeholder="Код валюты">
    </label>
</template>

<script>

export default {
  name: "search",
  props: ['modelValue'],
  computed: {
    search: {
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
  .currencies-search {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;

    &__text {
      margin-right: 10px;
    }

    &__input {
      padding: 0 10px;
      outline: none;
      border: 0;
      border-bottom: 1px solid #000;
    }
  }

</style>
