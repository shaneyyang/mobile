<template>
  <div class="page-user-profile">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      title="编辑资料"
      right-text="保存"
      @click-right="save()"
    ></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像" center>
        <!--
        slot="default" 自定义单元格右侧内容
        fit="cover"  图片填充模式 保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边
        -->
        <van-image
          slot="default"
          width="56"
          height="56"
          fit="cover"
          round
          :src="userProfile.photo"
        />
      </van-cell>
      <!-- value=xxx 设置单元格右侧内容部分 -->
      <van-cell is-link v-model="userProfile.name" title="名称" />
      <van-cell is-link v-model="userProfile.gender" title="性别" />
      <van-cell is-link v-model="userProfile.birthday" title="生日" />
    </van-cell-group>
  </div>
</template>

<script>
// 获取用户资料的api
import { apiUserProfile } from '../../api/user'

export default {
  name: 'user-profile',
  data () {
    return {
      // 用户信息
      userProfile: {}
    }
  },
  created () {
    this.getUserProfile() // 调用获取用户资料的方法
  },
  methods: {
    // 获取用户资料的方法
    async getUserProfile () {
      this.userProfile = await apiUserProfile()
    },

    save () {
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style scoped lang='less'></style>
