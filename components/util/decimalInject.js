
let Decimal = null
let opening = false

let _array = []
function func () {

}

export const getDecimal = () => {
  return new Promise((resolve, reject) => {
    if (Decimal) {
      resolve(Decimal)
      return
    }
    // opening = true
    import('decimal.js').then(module => {
      // console.log('succee the decimal')
      Decimal = module.default
      resolve(Decimal)
    }).catch(err => {
       console.log('Chunk loading failed')
      //  opening = false
    })
  })
}
