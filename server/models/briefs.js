/**
 * @author {chen.zena@husky.neu.edu}
 * @file briefs的model
 */

import query from '../utils/query'
import escape from '../utils/escape'

class Briefs {
    async getBrief(username) {
        return await query(escape`SELECT content FROM ABOUT WHERE user=${username}`)
    }

    async updateBrief(user, content) {
        return await query(escape`UPDATE ABOUT SET content=${content} WHERE user=${user}`)
    }
}

export default new Briefs()
