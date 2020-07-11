const onvif = require('node-onvif');
const fs = require('fs')
const { spawn } = require('child_process');
const until = require('./until')

module.exports = class {

    constructor({ ip, rtsp }) {
        let p = `${until.storagePath}${ip}`
        // 创建文件夹
        if (!fs.existsSync(p)) {
            fs.mkdirSync(`${until.storagePath}${ip}`)
        }
        this.ipPath = p

        this.ip = ip
        this.rtsp = rtsp
        this.ls = null
        this.start()
        // 初始化控制器
        /*
        let device = new onvif.OnvifDevice({
            xaddr, user, pass: password
        });
        this.loading = false
        device.init().then((info) => {
            console.log(JSON.stringify(info, null, '  '));
            this.device = device
        }).catch(error => {
            console.error(error);
        })
        */
    }

    start() {
        // 开始录像
        let { rtsp, ls, ip, ipPath } = this

        if (ls != null) {
            this.stop();
            setTimeout(() => {
                this.ls = null;
                this.start()
            }, 1000)
        }
        else {
            let today = new Date()
            let dir = ipPath + '/' + [today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes()].join('-')
            if (!fs.existsSync(dir)) fs.mkdirSync(dir)

            this.playlist = `${dir}/playlist.m3u8`
            let args = `-i ${rtsp} -c copy -map 0 -f segment -segment_list ${this.playlist} -segment_time 5 ${dir}/output%03d.ts`

            const ls = spawn('ffmpeg', args.split(" "));

            ls.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

            ls.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            ls.on('close', (code) => {
                console.log(`子进程退出，退出码 ${code}`);
            });
            this.ls = ls
        }
    }

    stop() {
        // 停止录像
        if (this.ls) this.ls.kill('SIGHUP')
    }

    list() {
        let arr = fs.readdirSync(this.ipPath)
        console.log(arr)
        // 录像列表
        return arr
    }

}