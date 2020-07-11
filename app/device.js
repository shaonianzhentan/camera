
const storage = require('./storage')
const api = storage.init('cfg.json', './app/dist/')

const Camera = require('./camera')
let camera = {}

module.exports = class {

    static get camera() {
        return camera
    }

    static async add({ name, rtsp, onvif }) {
        let obj = new URL(rtsp)
        let ip = obj.hostname
        // 保存数据
        await api.add({
            id: api.identity,
            ip,
            name,
            rtsp,
            snapshort: 'https://muse-ui.org/img/sun.a646a52d.jpg',
            onvif
        })
        // 启动录制
        camera[ip] = new Camera({ ip, rtsp })
        return true
    }

    static async update({ id, ip, name, rtsp, onvif }) {
        await api.save({
            id, ip, name, rtsp, onvif
        })
        return true
    }

    static async list() {
        let arr = await api.read()
        arr.forEach(ele=>{
            let ip = ele.ip
            let rtsp = ele.rtsp
            if(!Reflect.has(camera, ip)){
                camera[ip] = new Camera({ip, rtsp})
            }
        })
        return arr
    }

    static async delete(id) {
        await api.del(id)
    }
}