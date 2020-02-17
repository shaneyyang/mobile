<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    round
    position="bottom"
    :style="{ height: '90%' }"
    closeable
    close-icon-position="top-left"
    @close="isEdit=false"
  >
  <!-- group是弹出层标签 -->
   <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button type="danger" plain size="mini" round @click="isEdit=!isEdit">{{isEdit===true?'完成':'编辑'}}</van-button>
        </div>
      </div>
   </div>
    <!-- 宫格 -->
    <van-grid :column-num="4" :gutter="10">
      <van-grid-item v-for="(item,k) in channelList" :key="item.id" @click="clkChannel(k,item.id)">
        <span :style="{color:activeChannelIndex === k?'red':''}">{{item.name}}</span>
        <!-- 叉号内容 -->
        <van-icon v-show="k>0 && isEdit=== true" class="close-icon" name="close" @click="userToRest(item.id,k)"></van-icon>
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
      <van-grid-item v-for="item in restChannel" :key="item.id" @click="restToUser(item)">
        <span >{{item.name}}</span>
      </van-grid-item>
    </van-grid>
  </van-popup>
</template>

<script>
// 导入api
// 添加频道api
// 导入删除频道api
import { apiChannelAll, apiChannelAdd, apiChannelDel } from '../../../api/channel'

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
    return {
      // 添加全部频道列表
      channelAll: [],
      // 点击编辑叉号按钮
      isEdit: false
    }
  },
  computed: {
    // 添加剩余频道
    restChannel () {
      // 获取到“我的频道”的全部id，一数组格式返回
      // 使用map方法对channelList做遍历，返回一个新数组
      // 元素就是channelList数组各个元素的id值，数组长度与channelList一致
      const userChannelIds = this.channelList.map(item => { return item.id })
      // 遍历全部频道，返回不在“我的频道”出现的频道
      // filter：读channelAll做过滤，把id值不在userChannelIds 数组中的元素通过新数组给返回出来
      const rest = this.channelAll.filter(item => { return !userChannelIds.includes(item.id) })

      // 返回过滤好的剩余的频道
      return rest
    }
  },
  created () {
    // 调用全部频道列表
    this.getChannelAll()
  },
  methods: {
    // 激活频道
    clkChannel (index, id) {
      if (this.isEdit && index > 0) {
        // 删除频道
        this.userToRest(id)
        return false
      }
      // 频道对话框消失
      this.$emit('input', false)
      // 父组件频道激活
      this.$emit('update:activeChannelIndex', index)
    },
    // 删除频道
    userToRest (channelID, index) {
      // 页面删除
      this.channelList.splice(index, 1)
      // local删除
      apiChannelDel(channelID)
      // 判断是否被激活的频道被删除
      // 是的话，就让activeIndex向前移一位
      if (this.channelList.length === index) {
        this.$emit('activeChannelIndex', index - 1)
      }
    },
    // 添加频道
    restToUser (channel) {
      // 我的频道列表添加成员
      this.channelList.push(channel)
      // 永久化
      apiChannelAdd(channel)
    },
    // 获取全部列表
    async getChannelAll () {
      const result = await apiChannelAll()
      // console.log(result)
      this.channelAll = result.channels
    }
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
.close-icon {
    font-size: 20px;
    position: absolute;
    top:-5px;
    right: -5px;
    z-index: 999;
    background-color: #fff;
  }
.channel-content {
  .text {
    font-size: 16px;

  }
  .active {
    color: red;
  }

  .info {
    display: flex;
    align-items: center;
  }
}
</style>
