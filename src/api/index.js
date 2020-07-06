import Vue from 'vue'
import BaseApi from './lib/baseApi'
import Storage from './lib/baseStorage'
import Validate from './lib/baseValidate'
import service from './service'

import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
import Loading from 'muse-ui-loading';

const storage = new Storage({
    prefix: 'prefix',
    constant: [
        "token"
    ]
})
const validate = new Validate()
class API {

    get service() { return service }
    get storage() { return storage }
    get validate() { return validate }

    loading(text = '加载中...', options = {}) {
        const params = {
            text,
            ...options
        }
        // 如果加上延时参数，则返回Promise对象
        if ('delay' in options) {
            return new Promise((resolve) => {
                let loading = Loading(params)
                setTimeout(() => {
                    resolve(loading)
                }, options['delay'])
            })
        } else {
            return Loading(params)
        }
    }

    toast(msg, options = {}) {
        Toast.message({
            message: msg,
            ...options
        })
    }

    alert(msg, options = {}, title = "提示") {
        Message.alert(msg, title, options);
    }

    confirm(msg, options = {}, title = "提示") {
        return Message.confirm(msg, title, options);
    }

    prompt(msg, options = {}, title = "提示") {
        Message.prompt(msg, title, options);
    }

    async _component(component, propsData = {}, constructorArgs = {}) {
        let _constructor = Vue.extend(component)
        return new Promise((resolve, reject) => {
            let instance = new _constructor({
                ...constructorArgs,
                propsData,
            }).$mount(document.createElement('div'))
            instance.$on('done', data => resolve(data))
            instance.$on('close', data => reject(data))
        })
    }
}


export default {
    install(Vue, { router, store }) {
        if (this.installed) return
        this.installed = true

        Vue.api = Vue.prototype.api = Object.setPrototypeOf(API.prototype, BaseApi.prototype)
        //将api属性设置为不可写，为了防止某些插件冲突
        Object.defineProperty(Vue, 'api', {
            configurable: false,   // 不可删除
            writable: false, // 不可写
        });
        Object.defineProperty(Vue.prototype, 'api', {
            configurable: false,   // 不可删除
            writable: false, // 不可写
        });



        Vue.api.component = async (component, propsData = {}, constructorArgs = {}) => {
            if (typeof component === 'string') {
                let obj = {
                    // 'TaskList': () => import('@/components/common/TaskList')
                }
                let com = obj[component]
                if (com !== null) {
                    component = (await com()).default
                } else {
                    throw new Error('组件未定义')
                }
            }
            return Vue.api._component(component, propsData, {
                router,
                store,
                ...constructorArgs
            })
        }
    }
}