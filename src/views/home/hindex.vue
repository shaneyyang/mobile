<template>
  <div class="container">
    <van-tabs v-model="activeChannelIndex">
      <van-tab title="推荐">
        <!-- 瀑布流加载列表 -->

        <com-article></com-article>
      </van-tab>
      <van-tab title="数据库">
        <com-article></com-article>
      </van-tab>
      <van-tab title="后端">
        <com-article></com-article>
      </van-tab>
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
    }
  },
  components: {
    ComArticle
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.van-tabs {
  // 弹性布局
  display: flex;
  // 灵活的项目将垂直，一列一列显示文章
  flex-direction: column;
  height: 100%;
  // 深度选择器
  /deep/ .van-tabs__content {
    // flex:1 父控件有剩余空间，占满剩余空间，父控件空间不足，自身的空间大小是0%
    flex: 1;
    overflow: hidden;
  }
  // 深度选择器
  /deep/ .van-tab__pane {
    height: 100%;
  }
  // 给频道下边沿横向设置样式
  /deep/ .van-tabs__line {
    background-color: #1989fa;
  }
}
</style>
