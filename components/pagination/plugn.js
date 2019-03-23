import wagPagination from './pagination'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(wagPagination.name, wagPagination)
}else {
  wagPagination.install = function (Vue) {
    Vue.component(wagPagination.name, wagPagination)
  }
}

export default wagPagination
