<template>
  <div class="container">
    <van-nav-bar title="黑马头条" fixed right-text="搜索" @click-right="$router.push('/search')" />
    <div class="my-wrapper">
      <router-view></router-view>
    </div>
    <van-tabbar route>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item :to="userGo" icon="user-o" >{{$store.state.user.token?'我的':'未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout-index',
  computed: {
    userGo () {
      return this.$store.state.user.token ? '/user' : '/login'
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 92px;
    padding-bottom: 100px;
    box-sizing: border-box;
    // 如果是个人中心页面，则没有上面的导航栏
    &.noTop {
      padding-top: 0;
    }
  }
}
</style>
