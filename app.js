const Koa = require('koa');
const send = require('koa-send');
const koaBody = require('koa-body');
const static = require('koa-static');
const app = new Koa();

// 配置静态web服务的中间件
app.use(static('dist'));
app.use(koaBody());

// response
app.use(async ctx => {
    let { url, method, body } = ctx.request
    if (method == 'GET') {
        // 判断url是否存在
        
    } else {
        let { type, data } = body
        let res = {}
        if (type == "add") {

        } else if (type == "edit") {

        } else if (type == "delete") {

        } else if (type == "show") {

        }
        ctx.body = res;
    }
});

app.listen(3001);
console.log('监听地址：http://localhost:3001/')