<template>
  <ul @click="pageClick">

    <li>
      <button type="button"
              class="pagination-btn btn-prev"
              :class="{ disabled: this.currentPage <= 1 }">
        <
      </button>
    </li>

    <li v-if="pageCount > 0">
      <a href="javascript: void(0)"
         :class="{ active: currentPage === 1 }">
        1
      </a>
    </li>

    <li v-if="showPrevMore">
      <button class="pagination-btn more btn-interior-prev"
              @mouseenter="prevMoreContent = '<<'"
              @mouseleave="prevMoreContent = '...'">
        {{ prevMoreContent }}
      </button>
    </li>

    <li v-for="page in pages">
      <a href="javascript: void(0)"
         :class="{ active: currentPage === page }">
        {{ page }}
      </a>
    </li>

    <li v-if="showNextMore">
      <button class="pagination-btn more btn-interior-next"
              @mouseenter="nextMoreContent = '>>'"
              @mouseleave="nextMoreContent = '...'">
        {{ nextMoreContent }}
      </button>
    </li>

    <li v-if="pageCount > 1">
      <a href="javascript: void(0)"
         :class="{ active: currentPage === pageCount }">
        {{ pageCount }}
      </a>
    </li>
    
    <li>
      <button type="button"
              class="pagination-btn btn-next"
              :class="{ disabled: this.currentPage === this.pageCount || this.pageCount === 0 }">
        >
      </button>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      currentPage: Number,
      pageCount: Number
    },
    data () {
      return {
        showPrevMore: false,
        showNextMore: false,
        prevMoreContent: '...',
        nextMoreContent: '...'
      }
    },
    computed: {
      pages () {
        const pagesCount = 7
        const arr = []
        const currentPage = Number(this.currentPage)
        const pageCount = Number(this.pageCount)

        let showPrevMore = false
        let showNextMore = false

        if (pageCount > pagesCount) {
          if (currentPage > pagesCount - 2) {
            showPrevMore = true
          }

          if (currentPage < pageCount - 2) {
            showNextMore = true
          }
        }

        if (showPrevMore && !showNextMore) {
          const startPage = pageCount - (pagesCount - 2)
          for (let i = startPage; i < pageCount; i++) {
            arr.push(i)
          }
        } else if (!showPrevMore && showNextMore) {
          for (let i = 2; i < pagesCount; i++) {
            arr.push(i)
          }
        } else if (showPrevMore && showNextMore) {
          const pagesNum = Math.floor(pagesCount / 2) - 1
          for (let i = currentPage - pagesNum; i <= currentPage + pagesNum; i++) {
            arr.push(i)
          }
        } else {
          for (let i = 2; i < pageCount; i++) {
            arr.push(i)
          }
        }

        this.showPrevMore = showPrevMore
        this.showNextMore = showNextMore

        return arr
      }
    },
    watch: {
      showPrevMore (val) {
        if (!val) this.prevMoreContent = '...'
      },
      showNextMore (val) {
        if (!val) this.nextMoreContent = '...'
      }
    },
    methods: {
      pageClick (event) {
        const target = event.target
        const pageCount = this.pageCount
        const currentPage = this.currentPage

        if (target.tagName.toUpperCase() === 'UL') {
          return
        }

        let newPage = Number(event.target.textContent)

        if (target.className.indexOf('more') !== -1) {
          if (target.className.indexOf('btn-interior-prev') !== -1) {
            newPage = currentPage - 5
          } else if (target.className.indexOf('btn-interior-next') !== -1) {
            newPage = currentPage + 5
          }
        }

        if (target.className.indexOf('btn-prev') !== -1) {
          newPage = currentPage - 1
        } else if (target.className.indexOf('btn-next') !== -1) {
          newPage = currentPage + 1
        }

        if (!isNaN(newPage)) {
          if (newPage < 1) {
            newPage = 1
          }

          if (newPage > pageCount) {
            newPage = pageCount
          }
        }

        if (newPage !== currentPage) {
          this.$emit('change', newPage)
        }
      }
    }
  }
</script>

<style>
  ul {
    list-style: none;
    margin: 0;
    padding: 0
  }
  a {
    background-color: transparent;
    text-decoration: none;
    color: #959595;
    font-size: 12px
  }
  button {
    color: #959595;
    font-size: 12px;
    cursor: pointer;
    user-select: none
  }
  .vue-pagination {
    color: #959595;
    font-size: 12px
  }
  .vue-pagination ul {
    display:inline-block
  }
  .vue-pagination li {
    display: inline-block
  }
  .vue-pagination li a,
  .vue-pagination li button {
    display: inline-block;
    margin-left: 8px;
    padding: 0 6px;
    height: 30px;
    line-height: 32px;
    min-width: 18px;
    text-align: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none
  }
  .vue-pagination-white li a,
  .vue-pagination-white li button {
    border: 1px solid #fff;
    background: #fff;
  }
  .vue-pagination-gray li a,
  .vue-pagination-gray li button {
    border: 1px solid #f5f5f5;
    background: #f5f5f5;
  }
  .vue-pagination .pagination-btn {
    width: 32px;
    height: 32px;
    outline: none
  }
  .vue-pagination li a.active,
  .vue-pagination li a:hover {
    border: 1px solid #316ccb;
    background: #fff;
    color: #316ccb
  }
  .vue-pagination li button:hover {
    color: #316ccb
  }
  .vue-pagination li button.disabled {
    color: #e5e5e5;
    cursor: not-allowed
  }
  .vue-pagination-gray li button.disabled {
    background: #f5f5f5;
    border-color: #f5f5f5;
  }
  .vue-pagination-white li button.disabled {
    background: #fff;
    border-color: #fff;
  }
</style>
