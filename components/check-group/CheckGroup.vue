<template>
  <div>
      <slot></slot>
  </div>
</template>
<script>

export default {
  name: 'CheckGroup',
  props: {
    value: {
      type: Array,
      default: []
    }
  },

  data () {
    return {
      msg: 'test'
    }
  },

  watch: {
  },

  mounted () {
    // console.log(this)
    // this.setVal(2, true)
  },

  methods: {
    setArrVal (subVal, isCheck) {
      const index = this.value.indexOf(subVal)
      if (index < 0 && isCheck) {
        this.value.push(subVal)
      } else if (~index && !isCheck) {
        this.value.splice(index, 1)
      }
    }
  }
}
</script>

