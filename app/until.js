const crypto = require('crypto');
const path = require('path')
const secret = '这是一个自定义的密钥';

const storagePath = path.resolve(__dirname, '../dist/') + '/'
console.log(storagePath)
module.exports = class {
    static get storagePath() { return storagePath }
    static get user() { return 'admin' }
    static get password() { return 'password' }

    static encrypt(text) {
        const hash = crypto.createHmac('sha256', secret)
            .update(text)
            .digest('hex');
        return hash
    }
}