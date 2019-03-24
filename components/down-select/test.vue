<template>
  <div>
    <down-select-only
        :orginOpts="productnameOpts"
        v-model="productName"
        indexKey="indexKey"
        asycn
      ></down-select-only>
      <down-select
        :orginOpts="factoryOPts"
        v-model="factoryName"
        indexKey="indexKey"
        styleVal="width: 120px;"
        asycn
      ></down-select>
  </div>
</template>

<script>
import DownSelectOnly from './DownSelectOnly.vue'
import DownSelect from './DownSelect.vue'
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

      ],
      factoryName: '武钢',
      factoryOPts: []
    }
  },
  components: {
    DownSelectOnly,
    DownSelect
  }
}
</script>
