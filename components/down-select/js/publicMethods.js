import {
  trim
} from '../../util/util.js'
import ListOpera from './listOpera.js'
import {
  offsetPosition, 
  eleSize
} from '../../util/dom.js'

export  const methods = {
  open () {
    this.openList = true
  },
  close () {
    this.openList = false
  },
  mainHandler (e) {
    
  },
  handlerInput (e) {
    let value = e.target.value
    this.chosedItem.label = value
    this.$emit('input', value)
    // console.log(value)
  },
  focusInput (e) {
    this.focusing = true
  },

  blurInput (e) {
    this.focusing = false
  },

  keyupInput (e) {
  },
  
  filterOpts () {
    if (!this.isFilter) {
      this.opts = this.orginOpts
      return
    }
    let orginOpts = this.orginOpts
    
    this.opts = orginOpts.filter((o) => {
      let word = this.chosedItem.label
      if (!word) {
        return false
      }
      return o.label.indexOf(word) > -1
    })
  },

  selectOption (e) {
    const target = e.target || e.srcElement
    const classstr = target.getAttribute('class')
    if (classstr.indexOf('option-ele') < 0) {
      return
    }
    let num = target.getAttribute('data-index')
    this.choseNum = num
  },

  reset () {
    const closeEle = this.$el.querySelectorAll('.hover')
    if(closeEle.length < 1) {
      return
    }
    let parentWrapper = closeEle[0].parentNode.parentNode
    parentWrapper.scrollTop = 0
  },

  keyboardCtroll (val) {
    const listInstance = this.listoperaInstance
    const closeEle = this.$el.querySelectorAll('.hover')
    let self = this
    if (!listInstance) {
      return
    }
    switch (val) {
      case 1:
      listInstance.prev(function (num) {
        self.keyChoseItem.num = num
      })
      break
      case 2:
      listInstance.next(function (num) {
        self.keyChoseItem.num = num
      })
      break
      case 'enter':
      if (closeEle.length > 0) {
        self.choseNum = self.keyChoseItem.num
      }
      self.close()
      self.reset()
      break
      default:
    }
  }
}

export const changeScrollTop = (closeEle, cb) => {
  let isScroll = false
  if (closeEle.length > 0) {
    const ele = closeEle[0]
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