<template>
  <div :class="['fe-check', cls, {'disabled': disabled, 'checked': (!disabled && selfChecked)}]" @click="elClick">
    <span class="check-icon" :class="spanClass"></span>
    <slot></slot>
    <!-- {{propChecked}} -->
  </div>
</template>
<script>
  export default {
    props: {
      cls: {
        type: String,
        default: ''
      },
      spanClass: {
        String,
        default: ''
      },
      value: {
        type: Boolean,
        default: false
      },

      label: {
        type: [Number, String]
      },
      disabled: {
        type: Boolean,
        default: false
      },
      handle: {
        type: Object,
        default () { return {} }
      }
    },

    data () {
      return {
        selfChecked: false
      }
    },

    computed: {

      propChecked () {
        if (this.value) {
          return this.value
        }

        if (this.label) {
          const parent = this.getGroupParent()
          if (parent.$options.name 
            && parent.$options.name === 'CheckGroup'
            && ~parent.value.indexOf(this.label)
          ) return true
        }

        return false
      }
    },

    methods: {

      getGroupParent () {
        let parent = this.$parent
        let num = 0
        let name

        while (parent && parent.$parent && num < 5) {
          name = parent.$options.name
          if (name === undefined || name !== 'CheckGroup') {
            num++
            parent = parent.$parent
          } else {
            break
          }
        }
        return parent
      },

      elClick (ev) {
        if (!this.disabled) {
          this.selfChecked = !this.selfChecked
          this.$emit('input', this.selfChecked)
          const parent = this.getGroupParent()
          
          if (parent.$options.name && parent.$options.name === 'CheckGroup') {
            parent.setArrVal(this.label, this.selfChecked)
          } 
        }
      }

    },

    watch: {
      propChecked: {
        immediate: true,
        handler (val, oldVal) {
          this.selfChecked = val
        }
      } 
    }
  }
</script>
<style lang="stylus" scoped>
  $black = #656565
  $black_lightest = #C5C5C5
  $blue = #316CCB
  $blue_light = #407FE7
  $gray_dark = #E5E5E5
  fe-clear()
    &:after
      display block
      clear both
      width 0px
      height 0px
      content "\0020"
  .fe-check {
    display: inline-block;
    fe-clear()
    height: 20px;
    line-height: 20px;
    cursor: pointer;
    vertical-align: middle
    .check-icon {
      position: relative;
      float: left;
      display: inline;
      margin-top: 4px;
      margin-right: 6px;
      width: 10px;
      height: 10px;
      border: 1px $black_lightest solid;
    }
    &:hover {
      // color: $blue;
      .check-icon {
        border: 1px $blue solid;
      }
    }
    &.disabled {
      cursor: default;
      .check-icon,
      &.disabled:hover .check-icon {
        background-color: $gray_dark;
        border: 1px $black_lightest solid;
      }
    }
    &.checked {
      color: $black;
      .check-icon {
        background-color: $blue;
        border: 1px $blue solid;
      }
      .check-icon:before {
        position: absolute;
        left: -1px;
        top: -1px;
        width: 12px;
        height: 12px;
        background: url(./ok-icon.png) no-repeat;
        background-size: 12px 12px;
        content: ' '
      }
      &:hover {
        // color: $blue;
        .check-icon {
          background-color: $blue_light;
          border: 1px $blue_light solid;
        }
      }
    }
  }
</style>
