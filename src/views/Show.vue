<template>
  <mu-container class="page">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="backClick">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>客厅的摄像头
      <mu-button icon slot="right" @click="open = true">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-card style="width: 100%;">
      <mu-card-media>
        <img :src="device.snapshort">
      </mu-card-media>
      <mu-card-actions>
        sdfsdfsdfs
        sdfsdf
      </mu-card-actions>
    </mu-card>
    <!---->
    <mu-drawer :open.sync="open" :docked="false" :right="true">
      <mu-list>
        <mu-list-item button>
          <mu-list-item-title>当前时间</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>Menu Item 1</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>Menu Item 2</mu-list-item-title>
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
      list: [{}]
    };
  },
  created() {
    this.device = this.$route.params;
    if (!Reflect.has(this.device, "name")) {
      this.$router.replace("/");
    }
  },
  methods: {
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
