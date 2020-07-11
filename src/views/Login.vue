<template>
  <mu-container class="page">
    <mu-appbar color="primary">用户登录</mu-appbar>
    <mu-form ref="form" :model="form" class="mu-demo-form" label-position="right" label-width="80">
      <mu-form-item prop="user" label="用户名" :rules="usernameRules">
        <mu-text-field v-model.trim="form.user" placeholder="请输入用户名"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="pwd" label="密码" :rules="passwordRules">
        <mu-text-field v-model.trim="form.pwd" placeholder="请输入密码"></mu-text-field>
      </mu-form-item>
    </mu-form>
    <mu-button full-width color="primary" @click="submit">登录</mu-button>
  </mu-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: "admin",
        pwd: "password"
      },
      usernameRules: [
        { validate: val => !!val, message: "必须填写用户名" },
        { validate: val => val.length >= 3, message: "用户名长度大于3" }
      ],
      passwordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 3 && val.length <= 10,
          message: "密码长度大于3小于10"
        }
      ]
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(result => {
        if (result) {
          this.api.service.login(this.form).then(({ code, data, msg }) => {
            this.api.toast(msg);
            if (code == 0) {
              this.api.storage.set("token", data);
              this.$router.push("/");
            }
          });
        }
      });
    }
  }
};
</script>
