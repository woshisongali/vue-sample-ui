<template>
  <div class="down-select-mod" @click="mainHandler($event)">
    <slot></slot>
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
        :class="{'selected': chosedItem.label === item.label, 'hover': index == keyChoseItem.num}"
         v-for="(item, index) in opts" 
         :downuuid="downUUid"
         :data-index="index"
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
  
    readOnlyStr: {
      type: Boolean,
      default: false
    },
    
    // 异步请求接口时设为true
    asycn: {
      type: Boolean,
      default: false
    },
    // 是否对数组进行筛选过滤
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
    }
  },
  data () {
    return {
      msg: 'test',
      curval: null,
      focusing: false,
      openList: false,
      opts: [],
      downUUid: getDownSelectuuid(),
      choseNum: -1,
      isScroll: false,
      firstFocus: false,
      keyChoseItem: {
        num: -1
      },
      choseVal: {},
      chosedItem: {
        label: this.value,
        value: null
      }
    }
  },

  components: {
  },
  computed: {
  },

  created () {
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
    'chosedItem.label': {
      immediate: true,
      handler (val, oldval) {
        this.$emit('input', val)
        // 对于异步调用方案
        if (this.asycn && this.focusing) {
          this.$emit('asycnSendData', val)
        }
        this.filterOpts()
      }
    },

    // 如果有数据带入的话，首次focusing没有请求问题
    'focusing': {
      handler (val, oldval) {
        if (this.asycn && val && !this.firstFocus) {
          this.firstFocus = true
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
          this.keyChoseItem.num = -1
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


