import Router from 'koa-router'
import {baseApi} from '../config'
import ResetControllers from '../controllers/resetpassword'
import verify from '../middlewares/verify'

const api = 'resetpassword'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

router.post('/', ResetControllers.publishsns)

module.exports = router

