/**
 * @author {chen.zena@husky.neu.edu}
 *         {jia.xi@huaksy.neu.edu}
 *         {qiu.che@husky.neu.edu}
 * @file admin-routerlink
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import List from '@/components/List'


Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/welcome',
            component: List
        },
       
        
    ]
})

router.beforeEach((to, from, next) => {
    // redirect会重新进行路由守卫，next()不会
    if (localStorage.ashenToken) {
        axios.get(
                '/api/v1/tokens/check', {
                    headers: {
                        Authorization: `Bearer ${localStorage.ashenToken}`
                    }
                })
            .then(res => {
                // token验证通过
                const pathArr = ['/welcome','/']
                if (pathArr.indexOf(to.path) === -1) {
                    next('welcome')
                }
                else {
                    next()
                }
            })
            .catch(err => {
                // token验证不通过
                if (to.path !== '/') {
                    next('')
                }
                else {
                    next()
                }
            })
    }
    else {
        if (to.path !== '/') {
            next('')
        }
        else {
            next()
        }
    }
})

export default router
