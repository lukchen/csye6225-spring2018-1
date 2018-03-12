/**
 * @author {chen.zena@husky.neu.edu}
 * @file 关于个人简介的controller
 */

import Brief from '../models/briefs'

class BriefControllers {
    async getBrief(ctx) {
    	var {
            username,
        } = ctx.request.body

        ctx.body = await Brief.getBrief(username)
        console.log(ctx.body)
    }

    async updateBrief(ctx) {
        const user = ctx.params.user
        const content = ctx.request.body.content
        ctx.body = await Brief.updateBrief(user, content)
    }
}

export default new BriefControllers()
