<template>
  <p class="order-pop-up"
     :style="styleStr"
     :class="[ isWarn ? 'pop-warn' : '', setClass?  setClass : '']"
  >
    <slot></slot>
  </p>
</template>

<script>
  export default {
    props: {
      isWarn: {
        type: Boolean,
        default: false
      },
      
      // 可由外部传入class样式
      setClass: {
        type: String,
        default: null
      },
      styleStr: {
        type: String,
        default: ''
      }
    },

    data () {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  .order-pop-up{
    position: absolute;
    z-index: 5;
    // top: -52px;
    bottom 40px
    left 50%
    margin: 0;
    transform: translateX(-50%);
    padding: 12px 16px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0 0 16px 0 rgba(197,197,197,0.5);
    cursor: text;
    white-space: nowrap;
    &:after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      margin-left: -6px;
      border: 6px solid transparent;
      border-top-color: #fff;
    }
    &.pop-warn {
      color #ff7300
    }
    i {
      font-style normal
    }
  }
</style>

