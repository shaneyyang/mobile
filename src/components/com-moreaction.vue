<template>
  <div>
    <van-dialog :value="value" @input="$emit('input',$event)" :show-confirm-button="false" close-on-click-overlay>
        更多内容
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'com-moreaction',
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
