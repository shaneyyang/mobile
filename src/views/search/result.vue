<template>
  <div class='container'>
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()" />
       <!-- 瀑布流加载 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了"
              @load="onLoad">
      <van-cell v-for="item in list" :key="item" :title="item"/>
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
      list: [],
      loading: false,
      finished: false
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
    // 调用搜索方法
    this.getSearchList()
  },
  methods: {
  // 瀑布加载
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
    },
    // 获得搜索结果
    async getSearchList () {
      const result = await apiSearchList({ q: this.q })
      this.searchList = result.results
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
