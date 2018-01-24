/**
 * @author {chen.zena@husky.neu.edu}
 * @file users的model
 */

import query from '../utils/query'
import escape from '../utils/escape'

class Users {
    async findUser(username) {
        return await query(escape`SELECT user,password FROM USER WHERE user=${username}`)
    }
    async createUser(username, password) {
        return await query(escape`INSERT INTO USER (user,password) VALUES (${username},${password})`)
    }
}
export default new Users()
