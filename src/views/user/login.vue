<template>
  <div class="user-login">
    <van-nav-bar title="登录"></van-nav-bar>
      <van-cell-group>
        <van-field
          label="手机号"
          v-model="loginForm.mobile"
          type="text"
          placeholder="请输入用户名"
          required
          clearable
        />
        <van-field
          v-model="loginForm.code"
          type="password"
          placeholder="请输入密码"
          label="密码"
          required
          clearable
        >
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
      </van-cell-group>
    <div class="login-btn">
      <van-button type="info" block round size="small" @click="login()">登录</van-button>
    </div>
  </div>
</template>

<script>
import { apiUserLogin } from '../../api/user'
export default {
  name: 'user-login',
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async login () {
      try {
        // 获取数据
        var result = await apiUserLogin(this.loginForm)
        console.log(result)
        // 给vuex传值
        this.$store.commit('updateUser', result)
        // 登录成功
        this.$toast.success('登陆成功')
        // 跳转页面
        this.$router.push('/')
      } catch (err) {
        this.$toast.fail('手机号或验证码错误' + err)
      }
    }
  }
}
</script>

<style scoped lang='less'>
.login-btn {
  padding: 40px 0;
}
</style>
