<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <!-- 瀑布 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- art_id是大整型数字，所以需要转换成字符串 -->
        <van-cell v-for="item in articleList" :key="item.art_id.toString()" :title="item.title" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 导入api
import { apiArticleList } from '../api/article'
export default {
  name: 'com-article',
  props: {
    // 接收home组件传来的值
    channelId: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      // 瀑布流成员
      list: [], // 接收加载好的数据
      loading: false, // 加载中动画
      finished: false, // 是否停止加载
      // 下拉刷新成员
      isLoading: false,
      // 文章列表
      articleList: [],
      // 时间戳
      ts: Date.now()

    }
  },

  methods: {
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
        // 调用瀑布流
        this.onLoad()
      }, 1000)
    },

    // 瀑布流加载方法
    async onLoad () {
      // 1、获取文章数据
      const articles = await this.getArticleList()

      // 获得到的数据追加给articlelist成员
      this.articleList.push(...articles.results)
      // 关闭加载状态
      this.loading = false
      // 判断数据是否全部加载
      if (!articles.pre_timestamp) {
        // 停止上拉加载功能
        this.finished = true
      } else {
        this.ts = articles.pre_timestamp
      }
    },
    // 获取文章列表
    async getArticleList () {
      const result = await apiArticleList({ channel_id: this.channelId, timestamp: this.ts })
      // this.articleList = result.results

      // 返回result，在瀑布里面实现追加数据
      return result
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
