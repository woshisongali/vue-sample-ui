
/**
 * Created by songali on 19/03/01.
 */
import {
  getClientHeight, 
  getPageSize, 
  addClass,
  removeClass,
  scrollSize} from './dom'
import {throttleHelper} from './base'

class FixTop {
  constructor (fix, mainBox, bottomTop) {
    this.fix = fix
    this.mainBox = mainBox
    this.bottomTop = bottomTop
    this.bindEvent()
  }
  bindEvent () {
    let self = this
    // this.scrollFuc = (function FFIE(){
    //     return function () {
    //       self.scrollEvent()
    //     }
    // })()
    this.scrollFuc = throttleHelper(function FFIE () {
      self.scrollEvent()
    }, 60)
    document.addEventListener('scroll', this.scrollFuc)
  }
  scrollEvent () {
    // let fixHgt = this.fix.offsetHeight || 0
    let scrollTop = scrollSize().top
    let bottomTop = this.bottomTop
    let decrease = parseInt(getPageSize().height) - (parseInt(scrollTop) + parseInt(getClientHeight()))
    if (decrease < this.bottomTop) {
      // this.fix.style.cssText += ';position: relative; bottom: auto;'
      removeClass(this.fix, 'fixed-style')
      this.mainBox.style.cssText += ';padding-bottom: 0px;'
    } else {
      // this.fix.style.cssText += ';position: fixed; bottom: 0px;'
      addClass(this.fix, 'fixed-style')
      this.mainBox.style.cssText += ';padding-bottom: ' + bottomTop + 'px;'
    }
  }
  clear () {
    document.removeEventListener('scroll', this.scrollFuc)
  }
}
FixTop.uuid = 1
export default FixTop