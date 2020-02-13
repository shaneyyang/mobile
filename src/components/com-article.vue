<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <!-- 瀑布 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  name: 'com-article',
  data () {
    return {
      // 瀑布流成员
      list: [], // 接收加载好的数据
      loading: false, // 加载中动画
      finished: false, // 是否停止加载
      // 下拉刷新成员
      isLoading: false
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        Toast('刷新成功')
        this.isLoading = false
        // 调用瀑布流
        this.onLoad()
      }, 1000)
    },

    // 瀑布流加载方法
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
// 给上拉列表设置样式
.scroll-wrapper {
  height: 100%;
  // y方向溢出设置
  overflow-y: auto;
}
</style>
