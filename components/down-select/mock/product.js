
  const express = require('express')
  const router = express.Router()
  
  console.log('========= the test router in')
  // middleware that is specific to this router
  router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })
  // define the home page route
  router.get('/', function (req, res) {
    res.send('to see the down-select test')
  })
  // define the about route
  router.get('/kindName', function (req, res) {
    res.json(["39087866:::高线","10592444:::高碳钢",
    "127887932:::高强钢","137143016:::高铬钢",
    "17400749:::高速钢","248016251:::高工钢",
    "295740523:::高建钢","388860555:::高建板",
    "391678467:::高强卷","68889782:::高强板",
    "9174435:::高压管","1404977322:::高强中板",
    "1422152299:::高强度版","142585473:::高温合金",
    "228176397:::高速线材","240722361:::高频焊管","325320995:::高强度板",
    "385300686:::高强钢板","390272470:::高速钢棒","391912138:::高强钢卷"])
  })
  
  module.exports = router