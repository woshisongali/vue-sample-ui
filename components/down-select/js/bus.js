import Vue from 'vue'
export const bus = {
  factroyList: []
}
export const computData = new Vue({
  data () {
    return {
      orderType: null,
      operationType: null
    }
  }
})
