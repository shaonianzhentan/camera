<template>
  <mu-container class="page">
    <mu-appbar style="width: 100%;" color="primary">摄像头列表
      <mu-button icon slot="right" @click="addClick">
        <mu-icon value="add"></mu-icon>
      </mu-button>
    </mu-appbar>
    <mu-row gutter>
      <mu-col span="12" :sm="12" :md="6" :lg="4" v-for="(item,index) in list" :key="index">
        <mu-card style="width: 100%;margin-bottom:10px;">
          <mu-card-media :sub-title="item.name" @click="showClick(item)">
            <img :src="item.snapshort">
          </mu-card-media>
          <mu-card-actions>
            <mu-button flat @click="deleteClick(item)">删除</mu-button>
            <mu-button flat @click="editClick(item)">编辑</mu-button>
          </mu-card-actions>
        </mu-card>
      </mu-col>
    </mu-row>
  </mu-container>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: "卧室摄像头",
          snapshort: "https://muse-ui.org/img/sun.a646a52d.jpg"
        },
        {
          name: "卧室摄像头",
          snapshort: "https://muse-ui.org/img/sun.a646a52d.jpg"
        },
        {
          name: "卧室摄像头",
          snapshort: "https://muse-ui.org/img/sun.a646a52d.jpg"
        }
      ]
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.api.service
        .fetch({
          type: "list"
        })
        .then(res => {
          this.list = res.data;
        });
    },
    showClick(item) {
      console.log(item)
      this.$router.push({
        name: "show",
        params: {
          ...item
        }
      });
    },
    deleteClick({ id }) {
      this.api.confirm("确定删除？").then(async ({ result }) => {
        if (result) {
          let { msg } = await this.api.service.fetch({
            type: "delete",
            data: { id }
          });
          this.api.toast(msg);
          this.initData();
        }
      });
    },
    addClick() {
      this.$router.push(`/edit`);
    },
    editClick(item) {
      this.api.toast("暂未开发");
      console.log(item);
    }
  }
};
</script>
