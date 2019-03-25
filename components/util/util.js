
export const trim = (str) => {
  if (str === void 0) {
    return
  }
  return str.replace(/^\s+/gm, '').replace(/\s+$/gm, '')
}

export const strEllipsis = (str, n) => {
  if (str.replace(/[\u4e00-\u9fa5]/g, '**').length <= n) {
    return str
  } else {
    let len = 0
    let tmpStr = ''

    for (let i = 0, sublen = str.length; i < sublen; i++) {
      if (/[\u4e00-\u9fa5]/.test(str[i])) {
        len += 2
      } else {
        len += 1
      }
      if (len > n) {
        break
      } else {
        tmpStr += str[i]
      }
    }

    return tmpStr + '...'
  }
}

export const clone = (source) => {
  let target
  if (source instanceof Array) {
    target = []
    let i = source.length
    while (i--) {
      target[i] = clone(source[i])
    }
  } else if (source instanceof Object) {
    target = {}
    for (let key in source) {
      // console.log(source[key])
      target[key] = clone(source[key])
    }
    // console.log('======')
    // console.log(target)
  } else {
    return source
  }
  return target
}


export const containsEle = document.documentElement.contains ?
(parent, node) => {
  return parent !== node && parent.contains(node)
} :
(parent, node) => {
  while (node && (node = node.parentNode)) {
    if (node === parent) {
      return true
    }
    return false
  }
}

const uuidFuctory = (word, isTem) => {
  let str = word ? word : ''
  str += isTem ? (new Date().getTime()) : ''
  let num = 0
  return function () {
    num++
    return str += num
  }
}
export const getDownSelectuuid = uuidFuctory('option-ele', true)

const createZIndex = (num) => {
  let start = num
  return function () {
   return start++
  }
}

export const upZIndex = createZIndex(999)


export function throttleHelper (fn, interval) {
  let last
  let timer
  interval = interval || 250

  return (...rest) => {
    let args = rest
    let now = +new Date()
    // 上一次调用时间与当前时间的差小于时间间隔 重新计时
    if (last && last + interval > now) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn.apply(this, args)
      }, interval)
    } else {
      last = now
      fn.apply(this, args)
    }
  }

}

export const debounce = (func, wait, immediate) => {
  // immediate默认为false
  let timeout, args, context, timestamp, result

  let later = function() {
    let last = Date.now() - timestamp

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this
    args = arguments
    timestamp = Date.now()
    let callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  };
};