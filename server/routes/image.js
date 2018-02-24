import Router from 'koa-router'
import {baseApi} from '../config'
import ImageController from '../controllers/image'

const api = 'image'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

router.put('/', ImageController.imageStore)

router.get('/', ImageController.imageRead)

router.delete('/', ImageController.imageDelete)

module.exports = router