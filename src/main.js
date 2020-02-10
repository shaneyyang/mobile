import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 一次性导入vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 导入设置基准值
import 'amfe-flexible/index.min.js'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
