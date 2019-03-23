export const getStype = (ele, param) => {
  if (window.getComputedStyle) {
    return window.getComputedStyle(ele, null)[param]
  }
  if (ele.currentStyle) {
    return ele.currentStyle[param]
  }
  return false
}

export  const offsetPosition = (ele) => {
  return {
    top: ele.offsetTop,
    left: ele.offsetLeft
  }
}

export const eleSize = (ele) => {
  let height =ele.offsetHeight
  let width = ele.offsetWidth
  return {
    width,
    height
  }
}

export const  hasClass = (elem, cls) => {
  cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}
 
export const  addClass = (elem, cls) => {
  if (!hasClass(elem, cls)) {
    elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
  }
}
 
export const  removeClass = (elem, cls) => {
  if (hasClass(elem, cls)) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}

export const  getScroll = () => {
  return {
    top: window.pageYOffset || document.documentElement.scrollTop,
    left: window.pageYOffset || document.documentElement.scrollTop
  }
}

export const getWinSize = () => {
  return {
    width:  window.innerWidth ||  window.innerWidth,
    height:  window.innerHeight ||  window.innerHeight
  }
}

export const  getClientHeight = () =>{
  let clientHeight = 0
  if (document.body.clientHeight
    && document.documentElement.clientHeight) {
    clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) 
    ? document.body.clientHeight : document.documentElement.clientHeight
  } else {
     clientHeight = (document.body.clientHeight > document.documentElement.clientHeight)
     ? document.body.clientHeight : document.documentElement.clientHeight
  }
  return clientHeight
}

export const getPageSize = () => {
  return {
    height: document.body.scrollHeight
  }
}

export const scrollSize = () => {
  return {
    top: document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
  }
}

// 获取元素相对页面的高度
export const offset = (ele) => {
 let box = ele.getBoundingClientRect()
 let winPageX = window.pageXOffset || document.documentElement.scrollLeft
 let winPagY = window.pageYOffset || document.documentElement.scrollTop
 return {
   top: box.top + winPagY,
   left: box.left + winPageX,
   width: Math.round(box.width),
   height: Math.round(box.height)
 }
}

const style = (el, prop) => {
  return typeof getComputedStyle !== 'undefined'
    ? getComputedStyle(el, null).getPropertyValue(prop)
    : el.style[prop]
}

const overflow = (el) => {
  return style(el, 'overflow') + style(el, 'overflow-y') + style(el, 'overflow-x')
}

// 获取最近可滚动的祖先节点
const scrollParent = (el) => {
  if (!inBrowser) return
  if (!(el instanceof HTMLElement)) {
    return window
  }

  let parent = el

  while (parent) {
    if (parent === document.body || parent === document.documentElement) {
      break
    }
    if (!parent.parentNode) {
      break
    }
    if (/(scroll|auto)/.test(overflow(parent))) {
      return parent
    }
    parent = parent.parentNode
  }

  return window
}