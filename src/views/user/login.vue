<template>
  <div class="user-login">
    <van-nav-bar title="登录"></van-nav-bar>
      <van-cell-group>
        <ValidationProvider name="手机号" rules="required|phone" v-slot="{ errors}">
        <van-field
          label="手机号"
          v-model="loginForm.mobile"
          type="text"
          placeholder="请输入用户名"
          required
          clearable
          :error-message="errors[0]"
        />
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required" v-slot="{ errors }">
        <van-field
          v-model="loginForm.code"
          type="password"
          placeholder="请输入密码"
          label="密码"
          required
          clearable
          :error-message="errors[0]"
        >
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
        </ValidationProvider>
      </van-cell-group>
    <div class="login-btn">
      <van-button type="info" block round size="small" @click="login()">登录</van-button>
    </div>
  </div>
</template>

<script>
// 导入api方法
import { apiUserLogin } from '../../api/user'

// 导入校验规则
import { ValidationProvider } from 'vee-validate'
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
  components: {
    // 注册校验规则组件
    ValidationProvider
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
  // 是实际padding的2倍，页面显示应该是20px
  padding: 40px 0;
}
</style>
