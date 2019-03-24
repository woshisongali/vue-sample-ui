<template>
  <div class="down-select-mod" @click="mainHandler($event)">
    <div class="select-inners" 
    :style="divStyle"
    :class="[extroClass ? extroClass : '']">
        <input 
        class="down-select-input" 
        :style="styleVal"
        :placeholder="placeholder"
        :value="chosedItem.label"
        :readonly="readOnlyStr ? true : false"
        autocomplete="off"
        @input="handlerInput($event)"
        @focus="focusInput($event)"
        @blur="blurInput($event)"
        @keyup="keyupInput($event)"
        @keydown.up.prevent="keyboardCtroll(1)"
        @keydown.down.prevent="keyboardCtroll(2)"
        @keydown.enter.prevent="keyboardCtroll('enter')"
      >


    <!-- <span >{{ errors.first('inputvalid') }}</span> -->
    <div v-if="openList && opts.length > 0" 
      :class="[(this.opts.length <= 6) ? 'disable-scroll' : '']"
      class="options-wrapper">
      <ul class="options-group" @click="selectOption($event)">
        <!-- <li class="option-ele selected">ddddd</li>
        <li class="option-ele">jjjjj</li> -->
        <li class="option-ele"
        :class="{'selected': chosedItem.value === item.value, 'hover': index == keyChoseItem.num}"
         v-for="(item, index) in opts" 
         :downuuid="downUUid"
         :key="index">
          {{item.label}}
        </li>
      </ul>
    </div>

  </div>  

  </div>
</template>

<script>

import './index.styl'
import Vue from 'vue'
import {
  containsEle, 
  getDownSelectuuid,
  clone
} from '../util/util.js'
import {
  offsetPosition, 
  eleSize
} from '../util/dom.js'
// import { mapFields } from 'vee-validate'
import ListOpera from './js/listOpera.js'
import {
  methods,
  changeScrollTop
} from './js/publicMethods.js'


export default {
  props: {
    // 下拉提示数组
    orginOpts: {
      type: Array
    },
    
    placeholder: {
      type: String,
      default: '请输入'
    },
    styleVal: {
      type: String,
      default: ''
    },
    divStyle: {
      type: String,
      default: ''
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    readOnlyStr: {
      type: Boolean,
      default: false
    },
    
    // 异步请求接口时设为true
    asycn: {
      type: Boolean,
      default: false
    },
    // 对于固定的下拉数组不进行筛选
    isFilter: {
      type: Boolean,
      default: false
    },
    // 额外的class注入
    extroClass: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number]
    },
    focusIsFilter: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      msg: 'test',
      curval: null,
      focusing: false,
      // notFilter: false,
      openList: false,
      opts: [],
      downUUid: getDownSelectuuid(),
      choseNum: null,
      isScroll: false,
      firstFocus: false,
      keyChoseItem: {
        num: 0
      },
      choseVal: {},
      chosedItem: {
        label: this.value,
        value: null
      }
    }
  },

  components: {
    // 'popert-hint': PopertHint
  },
  computed: {
  },

  created () {
    // this.listoperaInstance = null
  },
  mounted () {
    let eventFunc = function (e) {
      let target = e.target || e.srcElement
      let downuuid = target.getAttribute('downuuid')
      if (downuuid && (downuuid === this.downUUid)) {
        this.close()
      } else if (containsEle(this.$el, target)) {
        this.open()
      } else {
        this.close()
      }
    }
    this.bodyClick = eventFunc.bind(this)
    document.body.addEventListener('click', this.bodyClick)
  },

  updated () {
    let closeEle = this.$el.querySelectorAll('.hover')
    changeScrollTop(closeEle, (isScroll) => {
      this.isScroll = isScroll
    })
  },

  methods: {
    ...methods
  },

  watch: {
    curval: {
      immediate: true,
      handler (val, oldval) {
        // 对于异步调用方案
        if (this.asycn && this.focusing) {
          // this.$parent.changeWorder(val, this.type)
        }
        // this.$emit('input', this.chosedItem.value)
      }
    },

    // 如果有数据带入的话，首次focusing没有请求问题
    'focusing': {
      handler (val, oldval) {
        if (this.asycn && val && !this.firstFocus) {
          this.firstFocus = true
          // this.$parent.changeWorder(this.curval, this.type)
        }
      }
    },

    orginOpts: {
      immediate: true,
      handler (val, oldVal) {
        this.filterOpts()
      }
    } ,

    opts: {
      immediate: true,
      handler (val, oldval) {
        if (!this.listoperaInstance) {
          this.listoperaInstance = new ListOpera(val)
        } else {
          this.listoperaInstance.setList(val, -1)
        }
      }
    },

    choseNum (num, oldNum) {
      const label = this.opts[num].label
      this.chosedItem.label = label
    }  
  },

  beforeDestroy () {
    this.listoperaInstance = null
    document.body.removeEventListener('click', this.bodyClick)
  }
}
</script>


