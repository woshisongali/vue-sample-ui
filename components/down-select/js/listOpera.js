class ListOpera {
  constructor (arr) {
    this.list = arr
    this.cursor = -1
  }

  next (callback) {
    if (this.list.length === 0) {
      return
    }
    this.cursor += 1
    if (this.cursor > (this.list.length - 1)) {
      this.cursor = this.list.length - 1
    }
    callback(this.cursor)
  }
  
  prev (callback) {
    if (this.list.length === 0) {
      return
    }
    this.cursor -= 1
    if (this.cursor < 0) {
      this.cursor = 0
    }
    callback(this.cursor)
  }

  setList (arr, cursor) {
    this.list = arr
    this.cursor = cursor
  }
  
  clear () {
    this.list = null
  }
}

export default ListOpera