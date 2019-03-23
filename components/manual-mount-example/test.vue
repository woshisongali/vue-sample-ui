<template>
  <div>to test the ManualMount</div>
</template>
<script>
import Vue from 'vue'
import ManualMount from './ManualMount'
export default {
  data () {
    return {
      msg: 'heeeellll',
      manual: null
    }
  },

  mounted () {
    this.initManual()
  }, 

  methods: {
    initManual () {
      this.manual = new Vue(ManualMount).$mount()
      document.querySelector('body').appendChild(this.manual.$el)
    },
    destroyManula () {
      if (!this.manual) { return}
      let $el = this.manual.$el
      this.manual.$destroy()
      $el.parentNode.removeChild($el)
      this.manual = null
      // this.$nextTick(() => {
      //   $el.parentNode.removeChild($el)
      //   this.manual = null
      // })
    }
  },

  beforeDestroy() {
    this.destroyManula()
  }
}
</script>

