/**
 * @author {chen.zena@husky.neu.edu}
 * @file briefs的model
 */
import query from '../utils/query'
import escape from '../utils/escape'

class Profile {
    async getProfile() {
        return await query(`SELECT * FROM USERTEMP`)
    }

}

export default new Profile()