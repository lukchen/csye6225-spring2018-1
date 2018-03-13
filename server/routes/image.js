import Router from 'koa-router'
import {baseApi} from '../config'
import ImageController from '../controllers/image'

const api = 'image'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

router.put('/', ImageController.imageStore)

router.post('/', ImageController.imageRead)

router.post('/:user', ImageController.imageDelete)

module.exports = router