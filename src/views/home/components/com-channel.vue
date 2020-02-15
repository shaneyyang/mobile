<template>
  <van-popup
  :value="value"
  @input="$emit('input',$event)"
  round
  position="bottom"
  :style="{ height: '30%' }"
  closeable
  close-icon-position="top-left"
/>
</template>

<script>
export default {
  name: 'com-channel',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
</style>
