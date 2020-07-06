const crypto = require('crypto');

const secret = '这是一个自定义的密钥';

module.exports = class {

    static get user() { return 'admin' }
    static get password() { return 'password' }

    static encrypt(text) {
        const hash = crypto.createHmac('sha256', secret)
            .update(text)
            .digest('hex');
        return hash
    }
}