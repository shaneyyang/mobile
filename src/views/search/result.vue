<template>
  <div class='container'>
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()" />
       <!-- 瀑布流加载 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了"
          @load="onLoad">
  <van-cell
            v-for="item in searchList"
            :key="item.art_id.toString()"
            :title="item.title"/>
</van-list>
  </div>
</template>

<script>
// 导入获取搜索数据api
import { apiSearchList } from '../../api/search'
export default {
  name: 'search-result',
  data () {
    return {
      searchList: [], // 搜索结果
      // 瀑布相关
      loading: false,
      finished: false,
      page: 1, // 页码
      per_page: 10 // 条数
    }
  },
  computed: {
    // 获取路由参数q，使得组件内部可以通过this.q的简便方式获得路由参数
    // 不是必须使用computed计算属性的
    q () {
      return this.$route.params.q
    }
  },
  created () {
  },
  methods: {
  // 瀑布加载
    // async onLoad () {
    // // 异步更新数据
    // // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    // // 加载延迟效果
    //   await this.$sleep(800)
    //   // 获取数据
    //   const result = await apiSearchList({ q: this.q, page: this.page, per_page: this.per_page })
    //   // 加载状态结束
    //   this.loading = false

    //   if (!result.results.length) {
    //     // 数据全部加载完成
    //     this.finished = true
    //     return false
    //   }
    //   // 追加数据
    //   // this.searchList.push(...result.results)
    //   // 页码累加
    //   this.page++
    // }
    async onLoad () {
      await this.$sleep(1000) // 暂停1s，不要太着急加载

      const result = await apiSearchList({ q: this.q, page: this.page, per_page: this.per_page })
      // 加载状态结束
      this.loading = false

      if (!result.results.length) {
        // 数据全部加载完成
        this.finished = true
        return false
      }
      // 追加数据
      this.searchList.push(...result.results)
      // 页码累加
      this.page++
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
  .van-list {
    flex: 1;
    margin-top: 92px;
  }
}
</style>
