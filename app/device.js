
const storage = require('./storage')

const api = storage.init('cfg.json', './app/dist/')

module.exports = class {

    static async add({ name, rstp, onvif }) {
        let obj = new URL(rstp)
        await api.add({
            id: api.identity,
            ip: obj.hostname,
            name,
            rstp,
            snapshort: 'https://muse-ui.org/img/sun.a646a52d.jpg',
            onvif
        })
        return true
    }

    static async update({ id, ip, name, rstp, onvif }) {
        await api.save({
            id, ip, name, rstp, onvif
        })
        return true
    }

    static async list(){
        return await api.read()
    }

    static async delete(id){
        await api.del(id)
    }


}