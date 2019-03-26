
 let Address = null

 export const getAddress = () => {
   return new Promise((resolve, reject) => {
    if (Address) {
      resolve(Address)
      return
    }
    import('./address-1.0.min.js').then(module => {
      Address = module.default
      resolve(Address)
    }).catch(err => {
      console.log('Address loading failed')
    })
   })
 }