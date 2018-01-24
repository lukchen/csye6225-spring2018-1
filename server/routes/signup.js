/**
 * @author {chen.zena@husky.neu.edu}
 * @file 操作文章介绍信息的api
 */

import Router from 'koa-router'
import {baseApi} from '../config'
import SignupController from '../controllers/signup'

const api = 'signup'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

router.post('/', SignupController.signupUser)

module.exports = router
