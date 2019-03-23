<template>
  <div class="vue-pagination-skip">
    到
    <input type="text" :value="this.currentPage" 
    @focus="handleFocus" 
    @blur="handleBlur" @input="handleChange"
    autocomplete="off"
    >
    页
    <button type="button" @click="handleClick">确定</button>
  </div>
</template>

<script>
  export default {
    props: {
      currentPage: Number
    },
    data() {
      return {
        oldValue: null,
        newValue: null
      }
    },
    methods: {

      handleFocus (event) {
        this.oldValue = event.target.value
      },

      handleBlur ({ target }) {
        this.newValue = Number(target.value)
        this.oldValue = null
      },

      handleClick () {
        if (this.newValue === null) {
          return
        }
        this.$emit('change', this.newValue)
      },
      
      handleChange (event) {
        let value = event.target.value
        let regs = [
          [/[^\d.]/g, ""],
          [/^\./g, ""],
          [/\.{2,}/g, "."],
          [".", "$#$"],
          [/\./g, ""],
          ["$#$", "."]
        ]
        let newVal = regs.reduce((value, reg) => {
          return value.replace(reg[0], reg[1])
        }, value)
        event.target.value = newVal
      }
    }
  }
</script>

<style>
  .vue-pagination .vue-pagination-skip {
    display: inline-block;
    margin-left: 40px;
    height: 32px;
    line-height: 32px
  }
  .vue-pagination .vue-pagination-skip input {
    margin-top: -4px;
    margin-left: 8px;
    margin-right: 8px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;
    width: 64px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #e5e5e5;
    background: #fff;
    text-align: center;
    vertical-align: middle;
    outline: none;
    transition: border .3s
  }
  .vue-pagination .vue-pagination-skip input:focus {
    border-color: #316ccb
  }
  .vue-pagination .vue-pagination-skip button {
    margin-left: 24px;
    padding: 0px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;
    width: 64px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #e5e5e5;
    background: #fff;
    color: #656565;
    outline: none
  }
  .vue-pagination .vue-pagination-skip button:hover {
    border-color: #316ccb;
    background: #316ccb;
    color: #fff
  }
</style>
