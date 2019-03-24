<template>
  <div class="dialog-box-wrapper" v-show="visible">
    <transition name="dialog-fade">
      <div class="dialog-inner-wrapper" 
      :style="boxStyle"
      v-show="subVisible">
        <dl class="dialog-main-block" 
            :class="[isCustom ? '' : 'dialog-base-width', boxClass ? boxClass : '']"
        :style="style">
          <div class="dialog-header">
            <slot name="dialtitle">
              {{title}}
            </slot>
          </div>

          <div class="dialog-body">
            <slot name="dialbody"></slot>
          </div>

          <p class="dialog-footer" v-show="!isCustom">
            <button 
              class="dialog-minorBtn btn-borderStyl"
              @click="cancel"
              v-show="showCancel"
            >取消</button>
            <button class="dialog-minorBtn" 
              @click="confrim($event)"
             :class="[disdConfirm ? 'disd-btn' : '']">{{confirmText}}</button>
          </p>

          <span class="dialog-closeBtn" 
          @click="close($event)"><span></span>
          </span>

        </dl>
        
      </div>
    </transition>

    <transition name="mask">
      <div class="dialog-mask" 
      :style="maskStyle"
      v-show="subVisible"></div>
    </transition>
  </div>
</template>
<script>
import { 
  eleSize, 
  getWinSize,
  addClass,
  removeClass
} from "../util/dom";
import { 
  throttleHelper,
  upZIndex
 } from "../util/util";
// let zIndexNum = 999;


export default {
  name: 'FeDialog',
  props: {
    // 在居中的位置上， 另外加入距离顶部的位置
    topDiff: {
      type: Number,
      default: -80
    },

    visible: {
      type: Boolean,
      default: false
    },

    title: {
      type: String,
      default: '提示'
    },

    showCancel: {
      type: Boolean,
      default: true
    },

    disdConfirm: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    isCustom: {
      type: Boolean,
      default: false
    },
    boxClass: {
      type: String,
      default: ''
    },

    lockScroll: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      msg: "a dialog",
      top: 0,
      subVisible: false,
      zIndex: upZIndex()
    };
  },

  computed: {
    style () {
      let style = {};
      style.marginTop = parseInt(this.top) + parseInt(this.topDiff) + "px";
      // style.zIndex = this.zIndex + 1;
      return style;
    },
    boxStyle () {
      return {
        zIndex: this.zIndex + 2
      }
    },
    maskStyle () {
      let style = {}
      style.zIndex = this.zIndex
      return style
    }
  },

  mounted() {
    document.body.appendChild(this.$el);
    this.resizeTop('none')
   
    let winResize = () => {
      if (!this.subVisible) return;
      this.resizeTop();
    };
    this.winResize = throttleHelper(winResize, 60).bind(this);
    window.addEventListener("resize", this.winResize);
  },
  
  updated() {
    
  },

  methods: {
    resizeTop(display) {
      const ele = this.$el.querySelector(".dialog-main-block");
      // 首次获取元素高度问题
      if (display && display === 'none') {
        let parent = ele.parentNode 
        parent.style.display = 'block'
      }
      let windHeight = getWinSize().height || 0;
      let eleHeight = eleSize(ele).height || 0;
      let top = (parseInt(windHeight) - parseInt(eleHeight)) / 2;
      if (top < 100) {
        top = 100;
      }
      this.top = top;
      // console.log('the top value' + this.top)
    },

    confrim (e) {
      let target = e.target || e.srcElement
      let classStr = target.getAttribute('class')
      if (~classStr.indexOf('disd-btn')) return
      this.$emit('confirm', this.next)
    },
    
    cancel () {
      this.subVisible = false;
      this.hide('cancel')
    },

    close () {
      this.subVisible = false;
      this.hide('close');
    },

    open() {},

    next () {
      this.subVisible = false;
      this.hide()
    },

    hide(type) {
      setTimeout(() => {
        this.$emit("hide");
        type ? this.$emit(type) : null
      }, 300);
      // this.$emit('hide')
    }
  },

  watch: {
    visible: {
      immediate: true,
      handler(val) {
        if (val) {
          this.zIndex = upZIndex()
        }
        this.$nextTick(() => {
          this.subVisible = val;
        });
        if (val && this.lockScroll) {
          addClass(document.body, 'lockScrollBody')
        } else {
          removeClass(document.body, 'lockScrollBody')
        }
      }
    }
  },

  beforeDestroy() {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    window.removeEventListener("resize", this.winResize);
  }
};
</script>
<style lang="stylus" scoped>
button {
  outline none
}
closeBtn(top, left) {
  position: absolute;
  top: top;
  left: left;
  display: block;
  height: 0;
  width: 0;
  content: "";
  border: 7px solid transparent;
}
$baseBlue = #316ccb
$hoverBlue = #407fe7
$borderGray = #f5f5f5
$fontMiddleGray = #656565
$btnGray = #e1e1e1
.dialog-box-wrapper {
  .dialog-minorBtn {
    box-sizing content-box
    margin-left 16px
    padding 0px 20px
    height 32px
    left 32px
    background $baseBlue
    border 1px solid $baseBlue
    cursor pointer
    color #fff
    &:hover {
      background $hoverBlue
      border 1px solid $hoverBlue
    }
    &.btn-borderStyl {
      background #fff
      border 1px solid $baseBlue
      color $baseBlue
      &:hover {
        background $baseBlue
        color #fff
      }
    }
    &.disd-btn {
      background $btnGray
      border 1px solid $btnGray
    }
  }
  .dialog-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.3);
    z-index: 99;
  }

  .dialog-main-block {
    position relative
  }

  .dialog-inner-wrapper {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    overflow: auto;
    z-index: 103;
  }

  .dialog-base-width {
    margin: 0px auto;
    width: 420px;
    background: #fff;
    .dialog-body {
      min-height 100px
      padding-left 32px
    }
  }

  .dialog-header {
    padding-left 32px
    height 48px
    line-height 48px
    font-size 14px
    font-weight bold
    color $fontMiddleGray
    border-bottom 1px solid $borderGray
  }

  .dialog-closeBtn {
    position: absolute;
    display: block;
    width: 14px;
    height: 14px;
    top: 16px;
    right: 32px;
    overflow: hidden;
    background-color: #959595;
    cursor: pointer;
    &:hover {
      background $baseBlue
    }
    &:before {
      closeBtn(-1px, 0px)
      border-top: 7px solid #fff;
    }
    &:after {
      closeBtn(1px, 0px)
      border-bottom: 7px solid #fff;
    }
    > span:before {
      closeBtn(0px, -1px)
      border-left: 7px solid #fff;
    }
    > span:after {
      closeBtn(0px, 1px)
      border-right: 7px solid #fff;
    }
  }

  .dialog-footer {
    padding-bottom 30px
    text-align center
  }
}

.dialog-fade-enter-active {
  animation: dialog-fade-in 0.3s;
}

.dialog-fade-leave-active {
  animation: dialog-fade-out 0.3s;
}

@keyframes dialog-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }

  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}

.mask-enter-active, .mask-leave-active {
  transition: opacity 0.3s;
}

.mask-enter, .mask-leave-to { /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
}
</style>
<style lang="stylus">
.lockScrollBody {
  height 100%
  overflow hidden
}
</style>


