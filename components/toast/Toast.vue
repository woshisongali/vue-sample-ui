<template>
  <div :class="toastClass" v-if="value">
    <div class="fe-toast-body">
      <i v-if="icon" :class="iconClass"></i>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  const prefixClass = 'fe-toast'

  export default {
    name: 'wag-toast',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      theme: {
        type: String,
        default: 'white'
      },
      icon: String
    },
    computed: {
      toastClass () {
        return `${prefixClass} ${prefixClass}-${this.theme}`
      },
      iconClass () {
        return `${prefixClass}-icon ${prefixClass}-${this.icon}`
      }
    }
  }
</script>

<style>
  @keyframes fe-toast-rotate {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }

  .fe-toast {
    position: fixed;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    width: 100%;
    height: 100%;
    text-align: center;
    font: 12px/1.5 -apple-system, BlinkMacSystemFont, 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
    transition: all 0.5s linear
  }

  .fe-toast-white {
    background-color: rgba(35,35,35,0.6)
  }

  .fe-toast .fe-toast-body {
    position: relative;
    top: 50%;
    display: inline-block;
    margin-top: -32px;
    padding: 20px 48px 20px 48px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    vertical-align: middle;
    transform: scale(1, 1);
    transition: all 0.2s linear
  }

  .fe-toast-white .fe-toast-body {
    color: #353535;
    background-color: #fff
  }

  .fe-toast-gray .fe-toast-body {
    color: #fff;
    background-color: rgba(53,53,53,0.8)
  }

  .fe-toast .fe-toast-icon {
    position: relative;
    display: inline-block;
    margin-top: 4px;
    margin-right: 6px;
    width: 16px;
    height: 16px;
    background-image: url(./sprite-icon.png);
    background-size: 48px, 32px;
    vertical-align: top
  }

  .fe-toast-white .fe-toast-loading {
    background-position: 0px 0px;
    animation: fe-toast-rotate 800ms infinite linear
  }

  .fe-toast-gray .fe-toast-loading {
    background-position: -16px 0px;
    animation: fe-toast-rotate 800ms infinite linear
  }

  .fe-toast-white .fe-toast-warn {
    background-position: -32px 0px
  }

  .fe-toast-gray .fe-toast-warn {
    background-position: -32px -16px
  }

  .fe-toast-white .fe-toast-success {
    background-position: 0px -16px
  }

  .fe-toast-gray .fe-toast-success {
    background-position: -16px -16px
  }
</style>
