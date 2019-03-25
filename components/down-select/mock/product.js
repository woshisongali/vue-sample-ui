
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
    let keyword = req.query.keyword
    if (keyword === null || keyword === ''){
      res.json([])
    } else {
      res.json(["39087866:::高线","10592444:::高碳钢",
      "127887932:::高强钢","137143016:::高铬钢",
      "17400749:::高速钢","248016251:::高工钢",
      "295740523:::高建钢","388860555:::高建板",
      "391678467:::高强卷","68889782:::高强板",
      "9174435:::高压管","1404977322:::高强中板",
      "1422152299:::高强度版","142585473:::高温合金",
      "228176397:::高速线材","240722361:::高频焊管","325320995:::高强度板",
      "385300686:::高强钢板","390272470:::高速钢棒","391912138:::高强钢卷"])
    }
  })

  router.get('/factoryName', function (req, res) {
    let keyword = req.query.keyword
    if (keyword === null || keyword === ''){
      res.json([])
    } else {
      res.json(["779693353:::安宁永昌","394948985:::安徽中杭","325328328:::安徽天大","389618243:::安徽富凯",
      "416221190:::包头大安","1452764904:::包钢集团","324832502:::北台钢铁",
      "779661611:::乌兰浩特钢铁","779653619:::五矿营口中板","779587816:::文水海威",
      "324812792:::无锡中彩","495682501:::无锡兆顺",
      "121676386:::郑州永通","399170168:::重庆东华","19048:::重庆四钢","732092633:::重庆永航",
      "385300686:::高强钢板","390272470:::高速钢棒","391912138:::高强钢卷"])
    }
  })
  
  module.exports = router