/**
 * @author {chen.zena@husky.neu.edu}
 * @file 操作个人简介的api
 */

import Router from 'koa-router'
import {baseApi} from '../config'
import BriefController from '../controllers/briefs'
import verify from '../middlewares/verify'

const api = 'briefs'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

router.post('/', BriefController.getBrief)
router.put('/:user', verify, BriefController.updateBrief)

module.exports = router

