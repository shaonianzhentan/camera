const Koa = require('koa');
const send = require('koa-send');
const koaBody = require('koa-body');
const static = require('koa-static');
const cors = require('koa2-cors');

const until = require('./app/until')
const device = require('./app/device');

const app = new Koa();
app.use(cors());

// 配置静态web服务的中间件
app.use(static('dist'));
app.use(koaBody());

// token
let token = until.encrypt(`${until.user}@${until.password}@${Date.now()}`)

// response
app.use(async ctx => {
    let { url, method, body } = ctx.request
    if (method == 'GET') {
        // 判断url是否存在
        if (url.includes(token)) {
            console.log('有权限访问')
        }
    } else if (method == 'POST') {
        let { type, data } = body
        let res = {
            code: 401,
            msg: '没有权限'
        }
        // url有token值
        if (url.includes(token)) {
            if (type == "add") {
                await device.add(data)
                res = { code: 0, msg: '添加成功' }
            } else if (type == "edit") {
                await device.update(data)
                res = { code: 0, msg: '编辑成功' }
            } else if (type == "delete") {
                await device.delete(data.id)
                res = { code: 0, msg: '删除成功' }
            } else if (type == "list") {
                let list = await device.list()
                res = { code: 0, data: list }
            }
        }
        // 登录接口
        if (type == "login") {
            let { user, pwd } = data
            if (user === until.user && pwd == until.password) {
                token = until.encrypt(`${until.user}@${until.password}@${Date.now()}`)
                res = {
                    code: 0,
                    data: token,
                    msg: '登录成功'
                }
            }
        }
        ctx.body = res;
    }
});

app.listen(3001);
console.log('监听地址：http://localhost:3001/')