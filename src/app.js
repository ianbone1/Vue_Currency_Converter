import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () =>{
  new Vue({
    el:"#app",
    data: {
      currencies: null,
      rates: [],
      cash: 0,
      fromCurrency: "EUR",
      toCurrency: "USD"
    },
    mounted: function() {
      this.fetchCurrencies()
    },
    methods: {
      getRates: function(){
        this.rates=this.currencies.rates;
        this.rates["EUR"] = 1.0;
      },
      fetchCurrencies: function(){
        fetch("https://api.exchangeratesapi.io/latest")
          .then(response => response.json())
          .then(json => this.currencies = json)
          .then(() => this.getRates())
      }
    },
    computed: {
      converted: function(){
        return ((((1/this.rates[this.fromCurrency])*this.rates[this.toCurrency])*this.cash).toFixed(2));
      }
    }
  });
});
