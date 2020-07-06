
const storage = require('./storage')

const api = storage.init('cfg.json', './dist')

module.exports = class {

    static async add({ name, rstp, onvif }) {
        let obj = new URL(rstp)
        await api.add({
            id: api.identity,
            ip: obj.hostname,
            name,
            rstp,
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
        await api.read()
    }

    static async delete(id){
        await api.del(id)
    }


}