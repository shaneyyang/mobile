<template>
  <div class="container">
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()" />
    <!-- 搜索组件 -->
    <van-search v-model.trim="searchText" placeholder="请输入搜索关键词" @search="onSearch(searchText)" />
    <van-cell-group v-if="suggestionList.length>0">
      <van-cell v-for="(item,k11) in suggestionList" :key="k11" icon="search">
        <!-- 关键字高亮 -->
        <!-- 传递参数：搜索的啥就是啥 -->
        <div v-html="highlightCell(item,searchText)" @click="onSearch(item)"></div>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <!-- 历史记录管理 -->
      <van-cell title="历史记录">
        <!-- 删除图标
      slot="right-icon" 命名插槽 给 cell单元格的右边显示内容(垃圾桶图标)
      name="delete" 垃圾桶图标
      style="line-height:inherit" 设置内容高度与父级一致
        -->
        <van-icon
          @click="isDeleteData=true"
          v-show="!isDeleteData"
          slot="right-icon"
          name="delete"
          style="line-height:inherit"
        ></van-icon>
        <div v-show="isDeleteData">
          <span style="margin-right:10px" @click="delAllSugguest()">全部删除</span>
          <span @click="isDeleteData=false">完成</span>
        </div>
      </van-cell>
      <!-- 历史联想项目数据展示 -->
      <!-- <van-cell title="Vue 源码解析"> -->
        <van-cell :title="item22" v-for="(item22,k22) in suggestionHistories" :key="k22">
        <!-- 删除按钮 -->
        <van-icon
          v-show="isDeleteData"
          slot="right-icon"
          name="close"
          style="line-height:inherit"
          @click="delSugguest(k)"
          ></van-icon>
</van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// 导入api
import { apiSuggestionList } from '../../api/search'

// 创建一个常量
const SH = 'suggest-histories'

export default {
  name: 'search-index',
  data () {
    return {
      searchText: '', // 搜索文字
      suggestionList: [], // 建议列表
      isDeleteData: false, // 历史记录开关
      // 联想历史记录
      suggestionHistories: JSON.parse(localStorage.getItem(SH)) || []
    }
  },
  watch: {
    // 监听搜索文字变化
    searchText: function (newV) {
      // 防抖操作
      clearTimeout(this.timer)
      // 关键字为空就停止联想
      if (!newV) {
        this.suggestionList = []
        // clearTimeout(this.timer)
        return false
      }
      // 防抖操作不能在此处，不然最后一次删除之后，还会出现联想
      // // 防抖操作
      // clearTimeout(this.timer)

      this.timer = setTimeout(async () => {
        // 获取搜索结果
        const result = await apiSuggestionList({ q: newV })
        // console.log(result)
        this.suggestionList = result.options
      }, 1000)
    }
  },
  methods: {
    // 删除本地存储数据
    // 删除“全部”联想建议历史记录
    delAllSugguest () {
      this.suggestionHistories = []
      localStorage.removeItem(SH)
    },
    // 删除“单个”的联想建议历史记录
    delSugguest (index) {
      this.suggestionHistories.splice(index, 1)
      // 更新localStorage数据
      localStorage.setItem(SH, JSON.stringify(this.suggestionHistories))
    },
    // 跳转页面
    onSearch (keyword) {
      // 没有联想内容，停止后续处理
      if (!keyword) {
        return false
      }

      // 根据已有的历史记录创建set对象
      const data = new Set(this.suggestionHistories)
      // 存储访问的关键字
      data.add(keyword)
      // 把添加好的整体历史记录变为array数组，赋予给data成员，使得页面及时显示（响应式）
      this.suggestionHistories = Array.from(data)

      // 把联想关键字数组存储给local里
      localStorage.setItem(SH, JSON.stringify(this.suggestionHistories))

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

      try {
        // 对关键字进行高亮处理
        return item.replace(reg, `<span style="color:red">${rst[0]}</span>`)
      } catch {
        return item
      }
    }

  }
}
</script>

<style scoped lang='less'></style>
