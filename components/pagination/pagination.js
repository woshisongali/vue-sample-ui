import page from './components/Page.vue'
import skip from './components/Skip.vue'

const Pagination = {
  name: 'my-pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: Number,
    pageCount: Number,
    theme: {
      type: String,
      default: 'white'
    }
  },
  render (h) {
    return h('div',
      {class: this.classes},
      [
        h('page',
          {
            props: {
              currentPage: this.veritableCurrentPage,
              pageCount: this.veritablePageCount
            },
            on: {
              change: this.handleCurrentChange
            }
          }
        ),

        h('skip',
          {
            props: {
              currentPage: this.veritableCurrentPage
            },
            on: {
              change: this.handleCurrentChange
            }
          }
        )
      ]
    )
  },

  data () {
    return {
      veritableCurrentPage: 1,
      veritablePageSize: 0
    }
  },

  components: {
    page, skip
  },

  computed: {
    veritablePageCount () {
      if (typeof this.total === 'number') {
        return Math.ceil(this.total / this.veritablePageSize)
      } else if (typeof this.pageCount === 'number') {
        return this.pageCount
      }
      return null
    },

    classes () {
      let theme = this.theme
      if (this.theme !== 'gray') theme = 'white'
      return [
        'vue-pagination',
        'vue-pagination-' + `${theme}`
      ]
    }
  },

  watch: {
    currentPage: {
      immediate: true,
      handler (val) {
        this.veritableCurrentPage = val
      }
    },

    pageSize: {
      immediate: true,
      handler (val) {
        this.veritablePageSize = val
      }
    },

    veritableCurrentPage (newVal, oldVal) {
      newVal = parseInt(newVal)

      if (isNaN(newVal)) {
        newVal = oldVal || 1
      } else {
        newVal = this.getValidCurrentPage(newVal)
      }

      if (newVal !== undefined) {
        this.$nextTick(() => {
          this.veritableCurrentPage = newVal
          if (oldVal !== newVal) {
            //this.$emit('update:currentPage', newVal)
            this.$emit('current-change', this.veritableCurrentPage)
          }
        })
      } else {
        //this.$emit('update:currentPage', newVal)
        this.$emit('current-change', this.veritableCurrentPage)
      }
    },

    veritablePageCount (newVal) {
      const oldPage = this.veritableCurrentPage
      if (newVal > 0 && oldPage === 0) {
        this.veritableCurrentPage = 1
      } else if (oldPage > newVal) {
        this.veritableCurrentPage = newVal === 0 ? 1 : newVal
      }
    }
  },

  methods: {

    handleCurrentChange (val) {
      this.veritableCurrentPage = this.getValidCurrentPage(val)
    },

    getValidCurrentPage (value) {
      value = parseInt(value)

      const pageCountFlag = typeof this.veritablePageCount === 'number'

      let resetValue
      if (!pageCountFlag) {
        if (isNaN(value) || value < 1) resetValue = 1
      } else {
        if (value < 1) {
          resetValue = 1
        } else if (value > this.veritablePageCount) {
          resetValue = this.veritablePageCount
        }
      }

      if (resetValue === undefined && isNaN(value)) {
        resetValue = 1
      } else if (resetValue === 0) {
        resetValue = 1
      }

      return resetValue === undefined ? value : resetValue
    }
  }
}

export default Pagination
