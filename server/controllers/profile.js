/**
 * @author {chen.zena@husky.neu.edu}
 * @file 关于文章介绍信息的controller
 */
 
import Profile from '../models/profile'
import query from '../utils/query'
import escape from '../utils/escape'

class ProfileControllers {

    async selectProfile(ctx) {
        ctx.body = await Profile.getProfile()
    }
}

export default new ProfileControllers()

