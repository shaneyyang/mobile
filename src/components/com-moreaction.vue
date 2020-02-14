<template>
  <div>
      <!-- 通过:value接收父组件的值，通过input事件把值传递给父组件，此处van标签已经做过处理 -->
      <!-- 如果是普通标签，@input="$emit('input',$event.target.value)" -->
      <!--  -->
    <van-dialog :value="value" @input="$emit('input',$event)" :show-confirm-button="false" close-on-click-overlay>
        更多内容
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'com-moreaction',
  //   接收父组件传来的值
  props: {
    value: {
      type: Boolean,
      default: false

    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
