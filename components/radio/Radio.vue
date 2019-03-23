<template>
  <div class="fe-radio" :class="{checked: checked, disabled: disabled}">
    <input type="radio" @change="input" :checked="checked" :disabled="disabled">
    <span class="radio-icon"></span>
    <span><slot></slot></span>
  </div>
</template>
<script>
export default {

  props: {
    value: [String, Number, Boolean],
    label: [String, Number, Boolean],
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    checked () {
      return this.value === this.label
    }
  },

  methods: {
    input () {
      this.$emit('input', this.label)
    }
  }
}
</script>
<style lang="stylus" scoped>
  $blue = #316ccb
  $black = #353535
  .fe-radio
    font-size 12px
    line-height 28px
    height 28px
    position relative
    display inline-block
    margin-right 20px
    input[type="radio"]
      position absolute
      opacity 0
      width 100%
      height 100%
      cursor pointer
    .radio-icon
      display inline-block
      width 15px
      height 28px
      background url('./i/radio.png') no-repeat center
      background-size 12px
      &:before
        content '\3000'
    .radio-text
      font-size 12px
  .fe-radio:hover {
    // color $blue
    .radio-icon {
      background-image url('./i/radio-hover.png')    
    }  
  }
  .fe-radio.checked {
    color $black
    .radio-icon {
      background-image url('./i/radio-checked.png')
    }
  }
  .fe-radio.disabled {
    color $black
    .radio-icon {
      background-image url('./i/radio-dis.png')   
    } 
  } 
</style>


