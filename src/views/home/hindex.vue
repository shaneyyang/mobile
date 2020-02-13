<template>
  <div class="container">
    <!-- v-model设置默认显示第几个频道 -->
    <van-tabs v-model="activeChannelIndex">
      <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
        <!-- 瀑布流加载列表 -->
        <com-article :channelId="item.id"></com-article>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 引入瀑布流加载文章组件
import ComArticle from '../../components/com-article'
// 引入api
import { apiChannelList } from '../../api/channel'

export default {
  name: 'home-index',
  data () {
    return {
      // 激活频道下标
      activeChannelIndex: 0,
      // 频道列表
      channelList: []
    }
  },
  // 引入子组件
  components: {
    ComArticle
  },
  created () {
    // 调取获取频道列表
    this.getChannelList()
  },
  methods: {
    // 获取频道列表
    async getChannelList () {
      const result = await apiChannelList()
      // console.log(result)
      this.channelList = result.channels
    }
  }
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
