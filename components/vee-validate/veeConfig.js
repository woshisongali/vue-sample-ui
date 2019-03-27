
import Vue from 'vue'
// import {checkLegalWords} from './ajax'
import {
  ValidationProvider, Validator, install
  as VeeValidate
} from 'vee-validate/dist/vee-validate.minimal.esm.js'

import {
  required,
  min,
  max,
  max_value,
  min_value,
  numeric,
  is,
  email
} from 'vee-validate/dist/rules.esm.js'

// import ar from 'vee-validate/dist/locale/ar'
// Validator.localize('ar', ar)
import zh_CN from './zh_CN.js'
// Validator.localize('zh_CN', zh_CN)

// Vue.use(VeeValidate, {
//   locale: 'zh_CN',
//   dictionary: {
//     zh_CN: zh_CN
//   }
// })
Vue.use(VeeValidate)
Validator.localize('zh_CN', zh_CN)

Vue.component('ValidationProvider', ValidationProvider)


Validator.extend('required', required)
Validator.extend('min', min)
Validator.extend('max', max)
Validator.extend('numeric', numeric)
Validator.extend('max_value', max_value)
Validator.extend('min_value', min_value)
Validator.extend('is', is)
Validator.extend('email', email)

// simple example
Validator.extend('required', {
  validate: value => {
    return !(value === void 0 || value === null || value === '')
  },
  getMessage: (field) => {
    return `${field}不能为空`
  }
})

// 最大最小值区间校验
const between = {
  validate(value, args) {
    let min = args[0]
    let max = args[1]
    console.log(value)
    return Number(min) <= value && Number(max) >= value;
  },
  getMessage(field, args) {
    let min = args[0]
    let max = args[1]
    return `${field}需在${min}和${max}之间`
  }
}
Validator.extend('between', between)


// 同步校验
Validator.extend('isbn', {
  validate: value => {
    return {
      valid: /^[\d-]*$/.test(value),
      data: {
        message: '请输入正确格式的isbn号'
      }
    }
  },
  getMessage: (field, params, data) => {
    return data.message
  }
})

// 异步校验

Validator.extend('promiseTest', {
  validate: (value)=> {
    return new Promise(resolve => {
      if (value.length > 5) {
        return resolve({
          valid: true
        })
      }
      return resolve({
        valid: false,
        data: {
          message: `the lenght to short`
        }
      })
    })
  },
  getMessage: (field, params, data) => data.message
})




const unitConfig = {
  // '吨': '支持6位整数3位小数'
  TON_REG : /^[1-9]\d{0,5}(\.\d{1,3})?$|^0\.\d{1,3}$/,
  // '米': '支持6位整数2位小数'
  METRE_REG: /^[1-9]\d{0,5}(\.\d{1,2})?$|^0\.\d{1,2}$/,
  // '平方米': '支持5位整数2位小数'
  SQUARE_METRE_REG: /^[1-9]\d{0,4}(\.\d{1,2})?$|^0\.\d{1,2}$/,
  // '其他': '支持6位整数'
  OTHER_REG: /^[1-9]\d{0,5}$/
}
Validator.extend('goodsquant', {
  validate: (value, [quant, begin, onsale]) => {
    let reg
    let message
    switch (quant) {
      case '吨':
      reg = unitConfig.TON_REG
      message = '支持6位整数3位小数'
      break
      case '米':
      reg = unitConfig.METRE_REG
      message = '支持6位整数2位小数'
      break 
      case '平方米':
      reg = unitConfig.SQUARE_METRE_REG
      message = '支持5位整数2位小数'
      break
      default:
      reg = unitConfig.OTHER_REG
      message = '支持6位整数'
    }
    let valid = reg.test(value)
    let istestBegin = begin && begin !== 'null' && begin !== 'undefined'
    if (istestBegin && valid) {
      begin = parseFloat(begin)
      onsale = parseFloat(onsale)
      value = parseFloat(value)
      if (value < begin || value > onsale) {
        valid = false
        message = `请输入${begin}和${onsale}之间的采购数量`
      }
    }
    return {
      valid: valid,
      data: {
        message: message
      }
    }
  },
  getMessage: (field, params, data) => {
    return data.message
  }
})

//  '支持6位整数2位小数'
const PRICE_REG = /^[1-9]\d{0,5}(\.\d{1,2})?$|^0\.\d{1,2}$/

Validator.extend('goodsprice', {
  validate: (value, [unit]) => {
    let message 
    let valid = true
    valid = PRICE_REG.test(value)
    if (!valid) {
      message = '仅支持6位整数2位小数'
    }
    if (parseFloat(value) == 0) {
      valid = false
      message = '金额需大于零'
    }
    return {
      valid: valid,
      data: {
        message: message
      }
    }
  },
  getMessage: (field, params, data) => {
    return data.message
  }
})

