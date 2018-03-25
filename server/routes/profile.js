/**
 * @author {chen.zena@husky.neu.edu}
 * @file 操作文章介绍信息的api
 */

import Router from 'koa-router'
import {baseApi} from '../config'
import ProfileController from '../controllers/profile'

const api = 'profile'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

router.get('/', ProfileController.selectProfile)

module.exports = router
