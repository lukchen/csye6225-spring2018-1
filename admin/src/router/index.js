/**
 * @author {chen.zena@husky.neu.edu}
 * @file admin端路由文件
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import List from '@/components/List'
import Tag from '@/components/Tag'
import ReadingList from '@/components/ReadingList'
import About from '@/components/About'

Vue.use(Router)

var flag=0;

const router = new Router({
    routes: [{
            path: '/login',
            component: Login
        },
        {
            path: '/lists',
            component: List
        },
        {
            path: '/tags',
            component: Tag
        },
        {
            path: '/readinglists',
            component: ReadingList
        },
        {
            path: '/about',
            component: About
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
})

router.beforeEach((to, from, next) => {
    console.log(to.path);
    // redirect会重新进行路由守卫，next()不会
    if (localStorage.ashenToken) {
        console.log('holy');
        axios.get(
                '/api/v1/tokens/check', {
                    headers: {
                        Authorization: `Bearer ${localStorage.ashenToken}`
                    }
                })
            .then(res => {
                // token验证通过
                const pathArr = ['/lists', '/tags', '/readinglists', '/about']
                if (pathArr.indexOf(to.path) === -1) {
                    next('lists')
                }
                else {
                    next()
                }
            })
            .catch(err => {
                // token验证不通过
                if (to.path !== '/login') {
                    next('login')
                }
                else {
                    next()
                }
            })
    }
    else {
        console.log('damn');
        if(to.path!=='/about'){
            console.log('shit');
            if (to.path !== '/login') {
                
                next('login')
            }
            else {
                next()
            }
        }else{
            console.log('fuck');
            axios.post(
            '/api/v1/tokens',
            {
                username: "abc@abc.abc",
                password: "123"
            })
            .then(res => {
                const data = res.data
                localStorage.setItem('ashenToken', data)
                next('/about')
            })
            .catch(err => {
                const errorMsg = err.response.data.error
                alert(errorMsg)
            })

        }

        localStorage.removeItem('ashenToken')
        localStorage.clear();
    }
})

export default router
