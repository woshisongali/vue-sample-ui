<template>
  <div>
    <down-select-only
        :orginOpts="productnameOpts"
        type="hrdProdName"
        v-model="productName"
        validateRule="required|max:30"
        indexKey="indexKey"
        asycn
      ></down-select-only>
  </div>
</template>

<script>
import DownSelectOnly from './DownSelectOnly.vue'
export default {
  data () {
    return {
      productName: '2',
      productnameOpts: [
        {value: '1', label: 'the first'},
        {value: '2', label: 'the second'},
        {value: '3', label: 'the thrid'},
        {value: '4', label: 'the sss'},
        {value: '5', label: 'the fff'},
        {value: '6', label: 'the dddddd'}

      ]
    }
  },
  components: {
    DownSelectOnly
  }
}
</script>
