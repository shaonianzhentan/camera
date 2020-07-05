<template>
  <mu-container class="page">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="backClick">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>新增
    </mu-appbar>
    <mu-form :model="form" class="mu-demo-form" label-position="right" label-width="80">
      <mu-form-item prop="name" label="设备名称">
        <mu-text-field v-model.trim="form.name" placeholder="客厅的摄像监控"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="rstp" label="rstp地址">
        <mu-text-field
          v-model.trim="form.rstp"
          placeholder="rstp://user:password@192.168.1.111:554/live"
        ></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="onvif" label="onvif地址">
        <mu-text-field
          v-model.trim="form.onvif"
          placeholder="http://user:password@192.168.1.111:8080/onvif"
        ></mu-text-field>
      </mu-form-item>
    </mu-form>
    <mu-button full-width color="primary" @click="submit">提交</mu-button>
  </mu-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        rstp: "",
        onvif: ""
      }
    };
  },
  methods: {
    backClick() {
      this.$router.back();
    },
    submit() {}
  }
};
</script>
