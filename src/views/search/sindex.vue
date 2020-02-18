<template>
  <div class="container">
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()" />
    <!-- 搜索组件 -->
    <van-search v-model.trim="searchText" placeholder="请输入搜索关键词" @search="onSearch(searchText)"/>
    <van-cell-group>
      <van-cell v-for="(item,k11) in suggestionList" :key="k11" icon="search">
        <!-- 关键字高亮 -->
        <!-- 传递参数：搜索的啥就是啥 -->
        <div v-html="highlightCell(item,searchText)" @click="onSearch(item)"></div>
      </van-cell>
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
    // 跳转页面
    onSearch (keyword) {
      // 没有联想内容，停止后续处理
      if (!keyword) { return false }

      this.$router.push('/search/result/' + keyword)
    },
    // 添加方法，高亮联想数据的关键字
    highlightCell (item, keywords) {
      // 正则表达式有两种
      // 一种是双//
      // 第二种是new 实例，此处使用此方法，可在里面解析使用变量keywords
      // i是忽略大小写
      const reg = new RegExp(`${keywords}`, 'i')

      // 获得匹配内容
      const rst = item.match(reg)

      // 对关键字进行高亮处理
      return item.replace(reg, `<span style="color:red">${rst[0]}</span>`)
    }
  }
}
</script>

<style scoped lang='less'></style>
