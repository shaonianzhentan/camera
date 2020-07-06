
import Vue from 'vue'
import router from '../router/index'
import BaseHttp from './lib/baseHttp'
// 判断是否生产环境
const isPro = process.env.NODE_ENV === 'production'
let baseURL = isPro ? `${location.origin}/` : 'http://localhost:3001/'
let origin = isPro ? `${location.origin}/` : `http://localhost:3001/`

const http = new BaseHttp({ baseURL, origin })
// 自定义接口验证
http.instance.custom_interceptors = {
    //成功处理
    success(response) {
        let res = response.data
        if (res.code == 401 && !location.hash.includes('#/login')) {
            console.log('需要登录')
            router.replace('/login')
        }
        return res;
    }
}


class Service {

    // 登录
    login(data) {
        return this.post('/', {
            type: 'login',
            data
        }, {})
    }

    fetch(data) {
        return this.post(`/${Vue.api.storage.get('token')}`, data, {})
    }
}

// 合并所有接口方法
for (let k in Object.getOwnPropertyDescriptors(Service.prototype)) {
    if (k !== 'constructor') {
        http[k] = Service.prototype[k]
    }
}

export default http