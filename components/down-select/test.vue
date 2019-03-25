<template>
  <div>

    <down-select-only
        :orginOpts="weightTypeOpts"
        v-model="weightType"
        indexKey="indexKey"
        asycn
      ></down-select-only>

      <down-select
        :orginOpts="productnameOpts"
        v-model="productName"
        indexKey="indexKey"
        styleVal="width: 100px;"
        asycn
        @asycnSendData="getProductName"
      >
        <span>钢材信息</span>
      </down-select>

      <down-select
        :orginOpts="factoryOPts"
        v-model="factoryName"
        indexKey="indexKey"
        styleVal="width: 100px;"
        asycn
        @asycnSendData="getFactoryName"
        isFilter
      >
        <span>工厂信息</span>
      </down-select>
  </div>
</template>

<script>
import DownSelectOnly from './DownSelectOnly.vue'
import DownSelect from './DownSelect.vue'
import {
  throttleHelper,
  debounce
} from '../util/util.js'
import axios from 'axios'

const getProduct = (key) => {
  let params = {
    name: 'aleee',
    keyword: key
  }
  let url = './downTest/kindName'
  return axios.get(url, {params})
}

const getFactory = (key) => {
  let params = {
    name: 'aleee',
    keyword: key
  }
  let url = './downTest/factoryName'
  return axios.get(url, {params})
}

const formatJSONPList = (list, code) => {
  let formatted = []
  for (let i = 0, len = list.length; i < len; i++) {
    let itemSplited = list[i].split(':::')
    formatted.push({
      code: code,
      id: itemSplited[0],
      value: itemSplited[1],
      label: itemSplited[1]
    })
  }
  return formatted
}

export default {
  data () {
    return {
      productName: '热轧钢',
      productnameOpts: [
      ],
      weightType: '2',
      weightTypeOpts: [
        {value: '1', label: 'the first'},
        {value: '2', label: 'the second'},
        {value: '3', label: 'the thrid'},
        {value: '4', label: 'the sss'},
        {value: '5', label: 'the fff'},
        {value: '6', label: 'the dddddd'}

      ],
      factoryName: '武钢',
      factoryOPts: []
    }
  },

  components: {
    DownSelectOnly,
    DownSelect
  },

  beforeCreate () {
    let self = this
    this.debounceGetProduct = debounce((key) => {
      getProduct(key).then(resp => {
        let list = resp.data
        self.productnameOpts = formatJSONPList(list)
      })
    }, 300)
  },

  methods: {
    getProductName (key) {
      this.debounceGetProduct(key)
    },

    getFactoryName (key) {
      let self = this
      if (this.factoryOPts.length > 0) {
        return
      }
      getFactory(key).then(resp => {
        let list = resp.data 
        self.factoryOPts = formatJSONPList(list)
      })
    }
  }
}
</script>
