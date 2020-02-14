import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 一次性导入vant
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'

// 引入全局样式，要在vant下面引入
import '../src/assets/css/global.less'

// 导入设置基准值
import 'amfe-flexible/index.min.js'

// 导入校验规则独立文件
import './utils/validate'

// 导入过滤器
import * as filters from './utils/filters' // 过滤器

// 注册全局过滤器
Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})

Vue.use(Vant)

// 使用懒加载
Vue.use(Lazyload)
// 创建一个延迟执行的成员,$sleep是自定义的
Vue.prototype.$sleep = time => {
  // 返回一个promise对象，应用端可以设置async/await使得异步变为同步
  // 同步可以使得后续代码都按照先后顺序执行
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve()
      // resolve没有实时数据，应用端也不用接收
    }, time)
  })
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
