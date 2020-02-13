<template>
  <div class="container">
    <van-tabs v-model="activeChannelIndex">
      <van-tab title="推荐">
        推荐内容展示
        <!-- 瀑布流加载列表 -->
        <div class="scroll-wrapper">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
        </div>
      </van-tab>
      <van-tab title="数据库">数据库内容展示</van-tab>
      <van-tab title="后端">后端内容展示</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home-index',
  data () {
    return {
      // 激活频道下标
      activeChannelIndex: 0,
      // 瀑布流成员
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
