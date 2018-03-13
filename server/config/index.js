/**
 * @author {chen.zena@husky.neu.edu}
 * @file server端配置文件
 */

export const db = {
    host: 'ec2-34-239-101-199.compute-1.amazonaws.com',
    port: '3306',
    user: 'csye6225master',
    password: 'csye6225password',
    multipleStatements: true
}

export const dbName = {
    database: 'ashen_db'
}

export const port = 3000

export const baseApi = 'api/v1'

export const secret = 'ashen-one'
