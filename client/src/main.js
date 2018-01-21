/**
 * @author {chen.zena@husky.neu.edu}
 * @file client端入口文件
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/style/index.scss'
import Vue from 'vue'
import App from '@/App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
    
})
