<template>
  <mu-container class="page">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="backClick">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>
      {{device.name}}
      <mu-button icon slot="right" @click="open = true">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-card style="width: 100%;">
      <mu-card-media>
        <video
          id="my-player"
          class="video-js"
          style="width:100%"
        >
        </video>
      </mu-card-media>
      <mu-card-actions>
        sdfsdfsdfs
        sdfsdf
      </mu-card-actions>
    </mu-card>
    <!---->
    <mu-drawer :open.sync="open" :docked="false" :right="true">
      <mu-list>
        <mu-list-item button v-for="(item,index) in list" :key="index" @click="loadData(item)">
          <mu-list-item-title>{{item}}</mu-list-item-title>
        </mu-list-item>
        <mu-list-item @click="open = false" button>
          <mu-list-item-title>关闭</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </mu-container>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      device: {},
      list: [],
      src: ""
    };
  },
  created() {
    this.device = this.$route.params;
    if (!Reflect.has(this.device, "name")) {
      this.$router.replace("/");
    }
    this.initData();
  },
  methods: {
    initData() {
      this.api.service
        .fetch({
          type: "camera",
          data: {
            ip: this.device.ip
          }
        })
        .then(res => {
          let arr = res.data;
          this.list = arr;
          // 加载视频
          if (arr.length > 0) this.loadData(arr[0]);
        });
    },
    loadData(date) {
      let url = `${this.api.service.origin}${this.api.storage.get("token")}/${
        this.device.ip
      }/${date}/playlist.m3u8`;
      console.log(url);

      let videojs = window.videojs;

      this.player = videojs(
        "my-player",
        {
          controls: true,
          muted: true,
          preload: 'auto',
          sources: [
            {
              src: url,
              type: "application/x-mpegURL"
            }
          ]
        },
        function onPlayerReady() {
          videojs.log("Your player is ready!");

          // In this context, `this` is the player that was created by Video.js.
          this.play();

          // How about an event listener?
          this.on("ended", function() {
            videojs.log("Awww...over so soon?!");
          });
        }
      );
    },
    backClick() {
      this.$router.back();
    },
    deleteClick(item) {
      this.api.confirm("确定删除？").then(({ result }) => {
        if (result) {
          console.log(item);
        }
      });
    },
    editClick(item) {
      console.log(item);
    }
  }
};
</script>
