import { createStore } from 'vuex'

export default createStore({
  state: {
    valute: []
  },
  getters: {
    getValute(state) {
      return state.valute;
    }
  },
  mutations: {
    setValute(state, value) {
      state.valute = value;
    }
  },
  actions: {
    setValute({ commit }) {
      return fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const currentValute = [];
        for(const item in data.Valute) {
           if(data.Valute[item].Nominal > 1) {
            data.Valute[item].Previous = +(data.Valute[item].Previous / data.Valute[item].Nominal).toFixed(4);
            data.Valute[item].Value = +(data.Valute[item].Value / data.Valute[item].Nominal).toFixed(4);
           }
  
          currentValute.push(data.Valute[item]);
        }
        commit("setValute", currentValute);
        return currentValute;
      })
      .catch((error) => {
        alert(error);
      })
    }
  },
  modules: {
  }
})
