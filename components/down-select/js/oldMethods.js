import {
  trim
} from '../../util/util.js'
import ListOpera from './listOpera.js'
import {bus} from './bus.js'


export  const methods = {
  open () {
    this.openList = true
  },
  close () {
    this.openList = false
  },
  // mainHandler (e) {
    
  // },
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

  // keyupInput (e) {
  // },
  
  filterOpts () {
    if (!this.isFilter) {
      this.opts = this.orginOpts
      return
    }
    let orginOpts = this.orginOpts
    // if (this.busListName) {
    //   orginOpts = bus[this.busListName]
    // }
    this.opts = orginOpts.filter((o) => {
      let word = this.curval
      if (!word && !this.focusIsFilter) {
        return true
      } else if (!word) {
        return false
      }
      return o.value.indexOf(word) > -1
    })
  },

  selectOption (e) {
    const target = e.target || e.srcElement
    const classstr = target.getAttribute('class')
    if (classstr.indexOf('option-ele') < 0) {
      return
    }
    let value = trim(target.innerHTML)
    this.curval = value
    // console.log(value) 
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
        // self.choseVal = self.opts[num]
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
        // self.curval = self.choseVal.value
        self.choseNum = self.keyChoseItem.num
      }
      self.close()
      self.reset()
      break
      default:
    }
  }
}