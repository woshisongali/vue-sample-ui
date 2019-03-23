
// 该文件用于统一ajax请求入口 建议异步请求应先在此处做相应配置
import axios from 'axios'
import querystring from 'querystring'
import {jsonp} from './jsonp'

const urls = {
  TESTGET: '/testCreateOrder/my',
  TESTPOST: '/new/another',
}



const getTest = (rawparam) => {
  let params = {
    name: 'aleee'
  }
  let url = urls.TESTGET
  return axios.get(url, {params})
}

const postTest = () => {
  let params = {
    name: 'aleee'
  }
  let options = {
    method: 'POST',
    headers: { 'x-csrf-token': 'mytokkksnnnfnnn' },
    data: params,
    url: urls.TESTPOST
  }
  return axios(options)
}





export {
  getTest,
  postTest
}
