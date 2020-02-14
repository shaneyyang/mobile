<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <!-- 瀑布 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- art_id是大整型数字，所以需要转换成字符串 -->
        <van-cell v-for="item in articleList" :key="item.art_id.toString()" :title="item.title">
          <!-- 文章描述信息 -->
          <!-- label：自定义标题下方描述 -->
          <template slot="label">
            <!-- 宫格 -->
            <van-grid :border="false" v-if="item.cover.type>0" :column-num="item.cover.type">
              <van-grid-item v-for="(item2,k2) in item.cover.images" :key="k2">
                <van-image width="90" height="90" :src="item2" lazy-load/>
              </van-grid-item>

            </van-grid>

            <p>
              <span>作者：{{item.aut_name}}</span>&nbsp;
              <span>评论：{{item.comm_count}}</span>&nbsp;
              <span>时间：{{item.pubdate |formatTime}}</span>&nbsp;
              <van-icon name="close" style="float:right;" @click="displayDialog()" />
            </p>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <!-- 更多操作弹出框 -->
    <!-- 父组件设置v-model，子组件props属性接收，并通过$emit传递回来 -->
    <more-action v-model="showDialog"></more-action>
  </div>
</template>

<script>
// 导入api
import { apiArticleList } from '../../../api/article'

// 导入更多操作组件
import MoreAction from './com-moreaction'

export default {
  name: 'com-article',
  props: {
    // 接收home组件传来的值
    channelId: {
      type: Number,
      required: true
    }
  },
  // 注册更多操作组件
  components: {
    MoreAction
  },
  data () {
    return {
      //
      showDialog: false,
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
    //
    displayDialog () {
      this.showDialog = true
    },
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
      // 应用延迟器，使得加载速度减慢
      // 该延迟器要执行多少秒的延迟
      // 因为返回的是一个promise对象，所以需要加await
      // 当前的代码没有执行完毕，后面的代码都不要执行，进行等待
      // 异步变为同步执行
      // 一个async里面可以用多个await
      await this.$sleep(800)

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
      const result = await apiArticleList({
        channel_id: this.channelId,
        timestamp: this.ts
      })
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
