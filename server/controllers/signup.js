/**
 * @author {chen.zena@husky.neu.edu}
 * @file 关于文章介绍信息的controller
 */
import User from '../models/users'
var bcrypt = require('bcryptjs');

class SignupControllers {

    async signupUser(ctx) {
        var {
            username,
            password,
        } = ctx.request.body
        const res = (await User.findUser(username))[0]
        if (res) {
        	ctx.body = "This username already exists!"
            console.log("This username already exists!");        
        }
        else {
            var salt = bcrypt.genSaltSync(10);
            password = bcrypt.hashSync(password, salt);
        	ctx.body = "Sign up successfull!"
            User.createUser(username, password)
            console.log("Sign up successfull!");
        }
    }
}

export default new SignupControllers()

