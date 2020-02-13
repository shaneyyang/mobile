<template>
  <div class="container">
    <van-tabs v-model="activeChannelIndex">
      <van-tab title="推荐">
        推荐内容展示
        <!-- 瀑布流加载列表 -->

        <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list> -->
        <com-article></com-article>

      </van-tab>
      <van-tab title="数据库">数据库内容展示</van-tab>
      <van-tab title="后端">后端内容展示</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ComArticle from '../../components/com-article'
export default {
  name: 'home-index',
  data () {
    return {
      // 激活频道下标
      activeChannelIndex: 0
      // // 瀑布流成员
      // list: [], // 接收加载好的数据
      // loading: false, // 加载中动画
      // finished: false // 是否停止加载
    }
  },
  components: {
    ComArticle
  },
  methods: {
    // // 瀑布流加载方法
    // onLoad () {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 加载状态结束
    //     this.loading = false

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
  }
}
</script>

<style lang="less" scoped>
.van-tabs{
  // 弹性布局
  display: flex;
  // 灵活的项目将垂直，一列一列显示文章
  flex-direction: column;
  height: 100%;
  // 深度选择器
  /deep/ .van-tabs__content{
    // flex:1 父控件有剩余空间，占满剩余空间，父控件空间不足，自身的空间大小是0%
    flex:1;
    overflow: hidden;
  }
  // 深度选择器
  /deep/ .van-tab__pane{
    height: 100%;
    // // 给上拉列表设置样式
    // .scroll-wrapper {
    //   height: 100%;
    //   // y方向溢出设置
    //   overflow-y: auto;
    // }
  }
  // 给频道下边沿横向设置样式
  /deep/ .van-tabs__line {
    background-color: #1989fa;
  }
}
</style>
