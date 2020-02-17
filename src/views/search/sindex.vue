<template>
  <div class="container">
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()" />
    <!-- 搜索组件 -->
    <van-search v-model.trim="searchText" placeholder="请输入搜索关键词" />
    <van-cell-group>
      <van-cell v-for="item in suggestionList" :title="item" :key="item" icon="search" />
    </van-cell-group>
  </div>
</template>

<script>
// 导入api
import { apiSuggestionList } from '../../api/search'
export default {
  name: 'search-index',
  data () {
    return {
      searchText: '', // 搜索文字
      suggestionList: [] // 建议列表
    }
  },
  watch: {
    // 监听搜索文字变化
    searchText: function (newV) {
      // 关键字为空就停止联想
      if (!newV) {
        this.suggestionList = []
        return false
      }
      // 防抖操作
      clearTimeout(this.timer)

      this.timer = setTimeout(async () => {
        // 获取搜索结果
        const result = await apiSuggestionList({ q: newV })
        // console.log(result)
        this.suggestionList = result.options
      }, 1000)
    }
  },
  methods: {

  }
}
</script>

<style scoped lang='less'></style>
