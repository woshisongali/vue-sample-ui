<template>
  <div class="down-select-mod" @click="mainHandler($event)">
    <div class="select-inners" 
    :style="divStyle"
    :class="[extroClass ? extroClass : '']">
        <input 
        class="down-select-input" 
        :class="[errors.has('inputvalid') ? 'box-erro' : '']"
        :style="styleVal"
        :placeholder="placeholder"
        v-model="curval"
        v-validate="validateRule"
        :data-vv-as="dataVvAs"
        name="inputvalid"
        :readonly="readOnlyStr ? true : false"
        autocomplete="off"
        @focus="focusInput($event)"
        @blur="blurInput($event)"
        @keyup="keyupInput($event)"
        @keydown.up.prevent="keyboardCtroll(1)"
        @keydown.down.prevent="keyboardCtroll(2)"
        @keydown.enter.prevent="keyboardCtroll('enter')"
      >

      <i v-if="showIcon" class="select-icon" :class="[openList ? 'focus': '']"></i>

      <!-- <popert-hint 
      v-show="errors.has('inputvalid') && focusing"
      setClass="testclass" isWarn>
        <i>{{ errors.first('inputvalid') }}</i>
      </popert-hint> -->
 
    

    <!-- <span >{{ errors.first('inputvalid') }}</span> -->
    <div v-if="openList && opts.length > 0" 
      :class="[(this.opts.length <= 6) ? 'disable-scroll' : '']"
      class="options-wrapper">
      <ul class="options-group" @click="selectOption($event)">
        <!-- <li class="option-ele selected">ddddd</li>
        <li class="option-ele">jjjjj</li> -->
        <li class="option-ele"
        :class="{'selected': curval === item.value, 'hover': choseVal && (choseVal.value === item.value)}"
         v-for="(item, index) in opts" 
         :downuuid="downUUid"
         :key="index">
          {{item.value}}
        </li>
      </ul>
    </div>

  </div>  

  </div>
</template>

<script>
import {
  containsEle, 
  getDownSelectuuid
} from '../util/util.js'
import {
  offsetPosition, 
  eleSize
} from '../util/dom.js'
// import { mapFields } from 'vee-validate'
import ListOpera from './js/listOpera.js'
import {methods} from './js/downMethods.js'
// import PopertHint from '../commons/poper-hint/index'

function filterOpts (arr, valWord) {
return arr.filter((o) => {
    if (valWord === void 0) {
      return true
    }
    return o.value.indexOf(valWord) > -1
  })
}

function changeScrollTop (closeEle, cb) {
  let isScroll = false
  if (closeEle.length > 0) {
    let ele = closeEle[0]
    let position = offsetPosition(ele)
    let eleHeight = eleSize(ele).height
    let visiHeight = parseInt(position.top) + parseInt(eleHeight)
    let parentWapper = ele.parentNode.parentNode
    let parentHeight = parseInt(eleSize(parentWapper).height)
    if (visiHeight > parentHeight) {
      parentWapper.scrollTop = parseInt(visiHeight/parentHeight) * parentHeight - eleHeight
      isScroll = true
    } else {
      parentWapper.scrollTop = 0
      isScroll = false
    }
  }
  if (closeEle.length > 0 && cb) {
    cb(isScroll)
  }
}

export default {
  props: {
    // 下拉提示数组
    orginOpts: {
      type: Array
    },
    validateRule: {
      type: String,
      default: ''
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
    dataVvAs: {
      type: String,
      default: '当前项'
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
    busListName: {
      type: String,
      default: null
    },
    // 功能模块名称， 
    type: {
      type: String,
      default: null
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
      curval: this.value,
      focusing: false,
      // notFilter: false,
      openList: false,
      opts: [],
      downUUid: getDownSelectuuid(),
      choseVal: null,
      isScroll: false,
      firstFocus: false
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
        // && this.nameFlags.touched
        if (this.asycn && this.focusing) {
          this.$parent.changeWorder(val, this.type)
        }
        // if (this.busListName) {
        //   this.$nextTick(() => {
        //     this.filterOpts()
        //   })
        // }
        this.$emit('input', val)
      }
    },
    // 如果有数据带入的话，首次focusing没有请求问题
    'focusing': {
      handler (val, oldval) {
        if (this.asycn && val && !this.firstFocus) {
          this.firstFocus = true
          this.$parent.changeWorder(this.curval, this.type)
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
    } 
  },

  beforeDestroy () {
    this.listoperaInstance = null
    document.body.removeEventListener('click', this.bodyClick)
  }
}
</script>

<style lang="stylus" scoped>
.down-select-mod {
  position relative
  .select-inners{
    position relative
    display inline-block
    &.small-abs {
      position absolute
      width 60px
      top 50% 
      margin-top -30px
    }
  }
  .down-select-input {
    width 86px
    height 28px
    padding 0px 5px
    border solid 1px #e5e5e5
    &.box-erro{
      border solid 1px #ff7300
    }
  }
  .select-icon {
    position absolute
    display block
    width 9px 
    height 6px 
    // border 1px solid red
    top 50%
    margin-top -3px
    right 6px
    background url(./i/arrow-down.png) no-repeat
    background-size 8px 4px
    &.focus {
      background url(./i/arrow-down-focus.png) no-repeat
      background-size 8px 4px
    }
  }
  .options-wrapper {
    position absolute
    z-index 5
    top 34px
    width 120px
    padding 8px 0
    max-height 208px
    background #ffffff
    border 1px solid #e5e5e5
    box-shadow 0 0 16px 0 rgba(197, 197, 197, 0.50)
    overflow auto
    &.disable-scroll{
      overflow hidden
    }
  }
  .small-abs {
    .options-wrapper {
      text-align left 
    }
  }
  .option-ele {
    padding 0 14px
    height 32px
    line-height 32px
    font-size 12px
    color #656565
    cursor pointer
    // text-overflow ellipsis
    overflow hidden
    // white-space nowrap
    // @TODO
    // &:hover,
    &:focus,
    &.hover,
    &:hover{
      color #316CCB
      background-color #F1F1F1
    }
    &.selected{
      color #FFF
      background #316CCB
      // &:hover, &.hover{
      //   color #316CCB
      //   background-color #F1F1F1
      // }
    }
  }
}

</style>


