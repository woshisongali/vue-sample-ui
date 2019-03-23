<template>
  <span @click="chgMsg">
    the single input
    {{msg}}
  </span>
</template>

<script>
export default {
  data () {
    return {
      msg: 'first'
    }
  },
  methods: {
    chgMsg () {
      this.msg = 'first' + Date.now()
    }
  },
  beforeDestroy() {
    console.log('to destroy the ele')
  },
}
</script>

