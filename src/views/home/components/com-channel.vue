<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    round
    position="bottom"
    :style="{ height: '90%' }"
    closeable
    close-icon-position="top-left"
  >
  <!-- group是弹出层标签 -->
   <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button type="danger" plain size="mini" round>编辑</van-button>
        </div>
      </div>
   </div>
    <!-- 宫格 -->
    <van-grid :column-num="4" :gutter="10">
      <van-grid-item v-for="(item,k) in channelList" :key="item.id" >
        <span :style="{color:activeChannelIndex === k?'red':''}">{{item.name}}</span>
      </van-grid-item>
    </van-grid>

    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
    </div>
    <!-- 宫格 -->
    <van-grid :column-num="4" :gutter="10">
      <van-grid-item v-for="value in 6" :key="value" text="文字" />
    </van-grid>
  </van-popup>
</template>

<script>
export default {
  name: 'com-channel',
  props: {
    // 接收home组件传递的value值
    value: {
      type: Boolean,
      default: false
    },
    // 接收home组件传递的频道列表
    // 数组的默认值不能直接为[]，需要函数
    // 可以用箭头函数来简化代码
    // default:function{
    //   return []
    // }
    channelList: {
      type: Array,
      default: () => []
    },
    // 接收home组件传来的高亮频道
    activeChannelIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.channel{
  margin-top: 70px;
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 16px;
      color: gray;
    }
  }
}
.channel-content {
  .text {
    font-size: 16px;

  }
  .active {
    color: red;
  }
  .close-icon {
    font-size: 20px;
    position: absolute;
    top:-5px;
    right: -5px;
    z-index: 999;
    background-color: #fff;
  }
  .info {
    display: flex;
    align-items: center;
  }
}
</style>
