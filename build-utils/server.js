
var express = require('express')
var bodyParser = require('body-parser');
// const birds = require('./birds')
var app = express()
// module.exports = app
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('the server has got')
})
 
module.exports = {
  start (config) {
    // const birds = require('./birds')
    // app.use('/birds', birds)
    try {
      Object.keys(config).map( key => {
        let router = require(config[key])
        app.use(key, router)
      })
    } catch (err) {
      console.error(err)
    }
    
    const theListener = app.listen(5000, function () {
      let host = theListener.address().address
      let port = theListener.address().port
      console.log("应用实例，访问地址为 http://", host, port)
      
    })
  }
}