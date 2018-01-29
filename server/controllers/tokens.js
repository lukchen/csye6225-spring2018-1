/**
 * @author {chen.zena@husky.neu.edu}
 * @file 关于token的controller
 */

import jwt from 'jsonwebtoken'
import User from '../models/users'
var bcrypt = require('bcryptjs');

import {
    secret
} from '../config'

class TokenControllers {

    async createToken(ctx) {
        const {
            username,
            password,
        } = ctx.request.body
        const res = (await User.findUser(username))[0]
        if (res) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            console.log(password)
            console.log(res.password)
            if ((bcrypt.compareSync(password, res.password))||(password==res.password)) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60// 一天
                }, secret)
                ctx.body = token
            }
            else {
                ctx.throw(401, '密码错误')
            }
        }
        else {
            ctx.throw(401, '用户名错误')
        }
    }

    checkToken(ctx) {
        ctx.body = '验证通过'
    }
}

export default new TokenControllers()
