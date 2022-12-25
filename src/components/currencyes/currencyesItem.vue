<template>
    <div class="currencies-list__item" :class="{ 'currencies-list__item--center': !selectCurrencyDefault }">
        <div class="currencies-list__item-text">
            1 {{ valuteItem.CharCode }} = {{ valuteItem.Value }} {{ selectCurrency }} 
        </div>
        <span v-if="selectCurrencyDefault" class="currencies-list__item-difference" :class="checkDifference">{{  currencyDifference  }}</span>
    </div>
</template>

<script>

export default {
  name: "currencyesItem",
  props: {
    valuteItem: {
        require: true,
        type: Object,
        default: {}
    },
    selectCurrency: {
        require: true,
        type: String,
        default: "RUB"
    },
    currencyDifference: {
        require: true,
        type: Number,
        default: 0
    }
  },
  computed: {
    checkDifference() {
        if(this.currencyDifference == 0) {
            return ""
        } else if(this.currencyDifference > 0) {
            return "positive-price"
        }
        return "negative-price"
    },
    selectCurrencyDefault() {
      return this.selectCurrency === 'RUB' ? true : false;
    }
  },
}
</script>

<style lang="scss">
  .currencies-list {
    &__item {
      padding: 10px;
      display: flex;
      justify-content: space-between;
    }
    &__item--center {
      justify-content: center;
    }
    &__item:nth-child(odd) {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      background: #f7f7f7;
    }

    &__item:nth-child(even) {
      background: rgba(254,255,207,.2);
    }

    &__item-text {
        margin-left: 40px;
    }

    &__item-difference {
        margin-right: 40px;
    }
  }

  .positive-price {
    color: green;

    &::after {
        content: "🢙";
    }
  }

  .negative-price {
    color: red;

    &::after {
        content: "🢛";
    }
  }

</style>
