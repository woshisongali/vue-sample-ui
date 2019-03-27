// import './assets/color.styl'
// import greeter from './src/Greeter'
// document.querySelector("#root").appendChild(greeter())

import Vue from 'vue'
import '../../components/vee-validate/veeConfig.js'
import App from './App.vue'


new Vue({
  el: '#app',
  render (h) {
    return h(App)
  }
})