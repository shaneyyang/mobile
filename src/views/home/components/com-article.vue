<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="downSuccessText">
      <!-- 瀑布 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- art_id是大整型数字，所以需要转换成字符串 -->
        <!-- 获取的文章的标题内容，已经在cell标签中设置属性 -->
        <van-cell v-for="item in articleList" :key="item.art_id.toString()" :title="item.title">
          <!-- 文章描述信息 -->
          <!-- label：自定义标题下方描述 -->
          <template slot="label">
            <!-- template标签里放的是图片、作者、评论、时间信息 -->
            <!-- 宫格 里面放的是封面图片-->
            <!-- 无边框，需要根据封面的类型来设置是否显示，并且列数与类型值相同 -->
            <van-grid :border="false" v-if="item.cover.type>0" :column-num="item.cover.type">
              <!-- 需要对图片进行遍历展示，此时是获取的文章数据里的images数组，数组中的成员是每个图片的地址 -->
              <van-grid-item v-for="(item2,k2) in item.cover.images" :key="k2">
                <!-- 自定义懒加载指令属性 -->
                <van-image width="90" height="90" :src="item2" lazy-load/>
              </van-grid-item>

            </van-grid>

            <p>
              <!-- p标签内放的是作者、评论、事件和点击屏蔽的图标 -->
              <span>作者：{{item.aut_name}}</span>&nbsp;
              <span>评论：{{item.comm_count}}</span>&nbsp;
              <span>时间：{{item.pubdate |formatTime}}</span>&nbsp;
              <van-icon name="close" style="float:right;" @click="displayDialog(item.art_id.toString())" />
            </p>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <!-- 更多操作弹出框 -->
    <!-- 对话框的结构与文章内容结构没有关系，所以不要放置在上面的代码结构中 -->
    <!-- 父组件设置v-model，子组件props属性接收，并通过$emit传递回来 -->
    <more-action v-model="showDialog" :articleID="nowArticle" @dislikeSuccess="handleDislikeSuccess"></more-action>
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
      // 添加子组件标签成员
      showDialog: false,
      // 添加不感兴趣文章id成员
      nowArticle: '',
      // 瀑布流成员
      list: [], // 接收加载好的数据
      loading: false, // 加载中动画
      finished: false, // 是否停止加载
      // 下拉刷新成员
      isLoading: false,
      // 文章列表
      articleList: [],
      // 时间戳
      ts: Date.now(),
      // 提示文字
      downSuccessText: ''
    }
  },

  methods: {
    // 文章不感兴趣
    handleDislikeSuccess () {
      // 删除指定的文章（删除结构）
      // 目标文章id：nowArticle
      const index = this.articleList.findIndex(
        item => item.art_id.toString() === this.nowArticle
      )
      // 根据下标进行删除
      this.articleList.splice(index, 1)
    },
    // 添加显示对话框弹框方法
    displayDialog (artID) {
      // 显示对话框，传递给子组件
      this.showDialog = true
      // 传递参数
      this.nowArticle = artID
    },
    // 下拉刷新
    // 下拉刷新新增文章

    async onRefresh () {
      // 延迟加载
      await this.$sleep(800)

      // 调用获取文章的方法
      const articles = await this.getArticleList()
      // console.log(articles)
      // 判断是否有获得最新文章
      if (articles.results.length > 0) {
        // 同上拉加载，获得的数据不能直接push到articleList中
        this.articleList.unshift(...articles.results)

        // 更新时间戳
        this.ts = articles.pre_timestamp
        // 提示文字
        this.downSuccessText = '文章更新成功'
      } else {
        // 提示文字为“已经是最新”
        this.downSuccessText = '已经是最新的'
      }

      // 加载动画停止
      this.isLoading = false
      // setTimeout(() => {
      //   // 下拉刷新的动画效果被禁止
      //   this.isLoading = false
      //   // 调用瀑布流
      //   this.onLoad()
      // }, 1000)
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
      // 扩展运算符，将获取的对象型数组中的单个对象处理后，push到文章列表中
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
