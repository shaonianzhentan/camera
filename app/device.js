
const storage = require('./storage')
const api = storage.init('cfg.json', './app/dist/')

const Camera = require('./camera')

module.exports = class {

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
        this[ip] = new Camera({ ip, rtsp })
        return true
    }

    static async update({ id, ip, name, rtsp, onvif }) {
        await api.save({
            id, ip, name, rtsp, onvif
        })
        return true
    }

    static async list() {
        return await api.read()
    }

    static async delete(id) {
        await api.del(id)
    }


}