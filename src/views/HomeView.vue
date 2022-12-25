<template>
  <div class="currencies">
    <h1>Список валют</h1>

    <div class="currencies__wrap">

      <search v-model="search" />
      <currencysTitle :valute="valute" v-model="selectCurrency"/>

      <div class="currencies-list">
        <currencysItem 
          v-for="item in valuteFiltered" :key="item.ID"
          :valuteItem="item"  
          :selectCurrency="selectCurrency"
          :currencyDifference = "checkDifference(item.Value, item.Previous)"
        />
      </div>

    </div>
  </div>
</template>

<script>

import { mapActions } from "vuex";
import currencysItem from "@/components/currencyes/currencyesItem"
import search from "@/components/currencyes/search"
import currencysTitle from "@/components/currencyes/currencysTitle"

export default {
  name: "Home",
  components: {
    currencysItem, search, currencysTitle
  },
  data() {
    return {
      valute: [],
      selectCurrency: "RUB",
      valuteFiltered: [],
      search: ""
    }
  },
  watch: {
    search(val) {
      this.valuteFiltered = this.valute.filter(item => item.CharCode.toLowerCase().indexOf(val.toLowerCase()) !== -1);
    },
    selectCurrency(val) {
      this.search = "";
      if(val !== "RUB") {
        let valutePrice = this.valute.find(item => item.CharCode === val).Value;

        this.valuteFiltered = JSON.parse(JSON.stringify(this.valute));

        this.valuteFiltered.forEach(item => {
          item.Value = +(item.Value / valutePrice).toFixed(4);
        });
      } 
      else {
        this.valuteFiltered = JSON.parse(JSON.stringify(this.valute));
      }
    }

  },
  methods: {
    ...mapActions(["setValute"]),
    checkDifference(newValue, oldValue) {
      return +(newValue - oldValue).toFixed(4);
    },

  },
  mounted() {
    this.setValute()
      .then((currentValute) => {
        this.valute = currentValute;
        this.valuteFiltered = JSON.parse(JSON.stringify(this.valute));
      });
  }
}
</script>


<style lang="scss">
  .currencies {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    &__title {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>


