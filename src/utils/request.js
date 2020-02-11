import axios from 'axios'
import JSONBig from 'json-bigint'

// 引入vuex，用于判断用户是否登录系统
import store from '@/store'
// 创建一个新的axios实例 和原来的axios没有关系
// 如果不设置，会有许多场景使用到axios，会对axios的使用造成影响
// 使用instance会避免交叉使用
// 当然部分地方可能还是会用到axios
const instance = axios.create({
  // 配置公共根地址
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 数据转换器
  transformResponse: [
    function (data) {
      // data就是后端响应的字符串 默认的转化是 JSON.parse 处理大数字是有问题的额 需要用JSONBig替换
      try {
        return JSONBig.parse(data)
      } catch (error) { // 报错说明data是空字符串，parse不能处理，会被catch捕捉处理
        return data
      }
    }
  ]

})

// 配置请求拦截器
instance.interceptors.request.use(function (config) {
  // config就是请求的参数，store就是组件内部的this.$store
  if (store.state.user.token) {
    //   统一注入token
    // config.headers.Authorization = 'Bearer '+ store.state.user.token
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  // 返回失败
  return Promise.reject(error)
})

// es6默认导出
export default instance
