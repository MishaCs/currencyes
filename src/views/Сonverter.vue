<template>
  <div class="converter">
    <h1 class="converter__title">Конвертер валют</h1>
    <div class="converter__wrap">
      <converterItem :valute="valute" v-model:code="currencyFromCode" v-model:count="currencyFrom"/>

      <button @click="flipCurrency()" class="converter__button">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M3.5 10h23c.674 0 .658-1 0-1h-23c-.673 0-.654 1 0 1zm1.344-4.126l-3.64 3.644 3.64 3.612c.463.45-.235 1.2-.71.71L.14 9.873c-.186-.186-.186-.525 0-.71l3.994-4c.487-.49 1.18.238.71.71zM26.5 20h-23c-.673 0-.657 1 0 1h23c.674 0 .655-1 0-1zm-1.344 4.126l3.64-3.644-3.64-3.612c-.463-.45.235-1.2.71-.71l3.994 3.967c.186.186.186.525 0 .71l-3.994 4c-.487.49-1.18-.238-.71-.71z"/></svg>
      </button>

      <converterItem :valute="valute" v-model:code="currencyToCode" v-model:count="currencyTo" :disabled="true"/>
    </div>
  </div>
</template>

<script>

import {mapActions} from "vuex";
import converterItem from "@/components/converter/converterItem"

export default {
  name: "converter",
  components: {
    converterItem, 
  },
  data() {
    return {
      valute: [],
      currencyFrom: 0,
      currencyFromCode: "RUB",
      currencyTo: 0,
      currencyToCode: "RUB",
      search: ""
    }
  },
  watch: {
    currencyFrom() {
      this.currencyCalculation();
    },
    currencyFromCode() {
      this.currencyCalculation();
    },
    currencyTo() {
      this.currencyCalculation();
    },
    currencyToCode() {
      this.currencyCalculation();
    },

  },
  methods: {
    ...mapActions(["setValute"]),
    flipCurrency() {
      if(this.currencyFrom !== this.currencyTo && this.currencyFromCode !== this.currencyToCode) {
        const currencyFrom = this.currencyFrom;
        const currencyFromCode = this.currencyFromCode;

        this.currencyFrom = this.currencyTo;
        this.currencyFromCode = this.currencyToCode;
        this.currencyTo = currencyFrom;
        this.currencyToCode = currencyFromCode;
      }
    },
    currencyCalculation() {
      if(this.currencyFromCode === this.currencyToCode) {
        this.currencyTo = this.currencyFrom;
      } else if(this.currencyFromCode !== "RUB" && this.currencyToCode !== "RUB"){
        let currencyFromRub = this.valute.find(item => item.CharCode === this.currencyFromCode).Value * this.currencyFrom;
        let currencyToRub = this.valute.find(item => item.CharCode === this.currencyToCode).Value;
        this.currencyTo = currencyFromRub / currencyToRub;
      } else if(this.currencyFromCode === "RUB") {
        let currencyToRub = this.valute.find(item => item.CharCode === this.currencyToCode).Value;
        this.currencyTo = this.currencyFrom / currencyToRub;
      } else {
        let currencyToRub = this.valute.find(item => item.CharCode === this.currencyFromCode).Value;
        this.currencyTo = this.currencyFrom * currencyToRub;
      }

      this.currencyFrom = +this.currencyFrom.toFixed(4);
      this.currencyTo = +this.currencyTo.toFixed(4);
    }
  },
  mounted() {
    this.setValute()
      .then((currentValute) => {
        this.valute = currentValute;
      });
  }
}
</script>


<style lang="scss">
  .converter {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    &__wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }


    &__button {
      height: 50%;
      cursor: pointer;
    }
  }

  .converter-valute {
    display: flex;
    flex-direction: column;

    &__select {
      margin-bottom: 20px;
      height: 50px;
      border-radius: 4px;
      padding: 0 5px;
      border: 1px solid gray;
      box-shadow: 0px 0px 10px rgb(179 187 198 / 45%);
    }

    &__input {
      border: 0;
      height: 50px;
      padding: 0 10px;
      border-bottom: 1px solid gray;
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
</style>


