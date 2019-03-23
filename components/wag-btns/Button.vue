<template>
  <button :class="btnClass" :disabled="disabled" @click="handleClick">
    <span v-if="showSlot" ref="slot">
      <slot></slot>
    </span>
  </button>
</template>

<script>
  const prefixClass = 'fe-btn'

  export default {
    name: 'wag-btn',

    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      disabled: Boolean
    },

    data () {
      return {
        showSlot: true
      }
    },
    computed: {
      btnClass () {
        return [
          `${prefixClass}`,
          {
            [`${prefixClass}-${this.type}`]: !!this.type,
            [`${prefixClass}-${this.size}`]: !!this.size
          }
        ]
      }
    },

    methods: {
      handleClick (event) {
        this.$emit('click', event)
      }
    },
    
    mounted () {
      this.showSlot = this.$slots.default !== undefined
    }
  }
</script>

<style>
  .fe-btn {
    display: inline-block;
    padding: 10px 18px;
    line-height: 1;
    border: 1px solid #316ccb;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-size: 12px;
    transition: color .2s linear, border-color .2s linear, background-color .2s linear
  }

  .fe-btn:focus{
    outline: none
  }

  .fe-btn[disabled],
  .fe-btn[disabled]:hover {
    border-color: #f5f5f5;
    background-color: #f5f5f5;
    color: #c5c5c5;
    cursor: not-allowed
  }

  .fe-btn-primary {
    color: #fff;
    background-color: #316ccb
  }

  .fe-btn-primary:hover {
    background-color: #407fe7;
    border-color: #407fe7
  }

  .fe-btn-default {
    color: #316ccb;
    background-color: #fff
  }

  .fe-btn-default:hover {
    color: #fff;
    background-color: #316ccb
  }

  .fe-btn-large {
    padding: 10px 24px;
    font-size: 14px
  }

  .fe-btn-small {
    padding: 6px 12px
  }
</style>
