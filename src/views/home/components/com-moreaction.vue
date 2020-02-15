<template>
  <div>
    <!-- 通过:value接收父组件的值，通过input事件把值传递给父组件，此处van标签已经做过处理 -->
    <!-- 如果是普通标签，@input="$emit('input',$event.target.value)" -->
    <!--  不展示确认按钮，在点击遮罩层后关闭弹窗-->
    <van-dialog
      :value="value"
      @input="$emit('input',$event)"
      :show-confirm-button="false"
      close-on-click-overlay
    >
      <van-cell-group v-if="isOneLevel">
        <van-cell icon="location-o" title="不感兴趣" @click="articleDislike"/>
        <!-- is-link：是否展示右侧箭头并开启点击反馈 -->
        <van-cell icon="location-o" title="举报垃圾内容" is-link @click="isOneLevel=false" />
        <van-cell icon="location-o" title="屏蔽作者" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isOneLevel=true" />
        <van-cell title="其他问题" icon="location-o" />
        <van-cell title="标题夸张" icon="location-o" />
        <van-cell title="低俗色情" icon="location-o" />
        <van-cell title="错别字多" icon="location-o" />
        <van-cell title="旧闻重复" icon="location-o" />
        <van-cell title="广告软文" icon="location-o" />
        <van-cell title="内容不实" icon="location-o" />
        <van-cell title="涉嫌违法犯罪" icon="location-o" />
        <van-cell title="侵权" icon="location-o" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
// 导入不感兴趣api
import { apiArticleDislike } from '../../../api/article'

export default {
  name: 'com-moreaction',
  //   接收父组件传来的值
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 接收目标文章id
    articleID: {
      type: String,
      // 要求必须传递
      required: true
    }
  },
  data () {
    return {
      // 判断cell-group结构成员
      isOneLevel: true
    }
  },
  methods: {
    // 文章不感兴趣处理
    async articleDislike () {
      const result = await apiArticleDislike(this.articleID)
      // console.log(result)
      // 弹出框消失
      this.$emit('input', false)
      // 给父组件传值
      this.$emit('dislikeSuccess')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
