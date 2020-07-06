const crypto = require('crypto');

const secret = '这是一个自定义的密钥';

export function encrypt(text) {
    const hash = crypto.createHmac('sha256', secret)
        .update(text)
        .digest('hex');
    return hash
}                   