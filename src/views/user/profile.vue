<template>
  <div class="page-user-profile">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      title="编辑资料"
      right-text="保存"
      @click-right="saveProfile()"
    ></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像" center @click="showPhoto=true">
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
      <van-cell is-link v-model.trim="userProfile.name" title="昵称" @click="showName=true" />
      <van-cell is-link :value="userProfile.gender===0?'男':'女'" title="性别" @click="showSex=true" />
      <van-cell is-link v-model="userProfile.birthday" title="生日" @click="showBirthday=true" />
    </van-cell-group>
    <!-- 弹头像 -->
    <van-popup v-model="showPhoto" position="bottom">
      <!-- 内容 -->
      <!-- 1 本地相册选择图片 -->
      <!-- 2 拍照 -->
      <van-cell is-link title="本地相册选择图片" @click="$refs.mypic.click()"></van-cell>
      <van-cell is-link title="拍照"></van-cell>
    </van-popup>
    <!-- 弹昵称 -->
    <van-popup v-model="showName" position="bottom">
      <!-- 编辑用户昵称  双向绑定用户的昵称-->
      <van-field v-model.trim="userProfile.name" type="textarea" rows="3"></van-field>
    </van-popup>
    <!-- 弹性别，
van-action-sheet"菜单"弹出层组件
与普通弹出层的区别就是，只可以设置"菜单"项目，
而普通弹出层可以自定义展示内容

v-model：是否显示
@select：选取项目的回调处理(内部可以设置弹层关闭、还可以设置选中项目信息等)
:actions：可选取项目菜单信息设定 [{ name: '男' }, { name: '女' }]
cancel-text="取消" 展示取消按钮
    -->
    <van-action-sheet v-model="showSex" @select="onSelect" :actions="actions" cancel-text="取消"></van-action-sheet>
    <!-- 弹生日 -->
    <van-popup v-model="showBirthday" position="bottom">
      <!-- 时间选择器
v-model：默认激活显示时间
type 时间类型，年月日
:min-date="minDate" 允许选取的最小时间
@cancel 单击取消按钮回调事件
@confirm 确认选取时间回调
      -->
      <van-datetime-picker
        v-model="nowDate"
        type="date"
        :min-date="minDate"
        @cancel="showBirthday=false"
        @confirm="confirmDate"
      ></van-datetime-picker>
    </van-popup>
    <!-- 选择文件控件 -->
    <input ref="mypic" @change="startUpload()" type="file" style="display:none" />
  </div>
</template>

<script>
// 引入dayjs
import dayjs from 'dayjs'

// 获取用户资料的api
import { apiUserProfile, apiUserPhoto, apiSaveProfile } from '../../api/user'

export default {
  name: 'user-profile',
  data () {
    return {
      userProfile: {}, // 用户信息
      showPhoto: false, // 头像弹出层
      showName: false, // 昵称弹出层
      showSex: false, // 性别弹出层
      actions: [{ name: '男' }, { name: '女' }], // 弹出菜单项目定义
      showBirthday: false, // 时间弹出层
      nowDate: new Date(), // 当前时间
      minDate: new Date('1900-01-01') // 允许选取的最小时间
    }
  },
  created () {
    this.getUserProfile() // 调用获取用户资料的方法
  },
  methods: {
    // 修改头像
    async startUpload () {
      const fd = new FormData()
      fd.append('photo', this.$refs.mypic.files[0])

      const result = await apiUserPhoto(fd)

      this.userProfile.photo = result.photo

      this.showPhoto = false
    },
    // 修改时间
    confirmDate (val) {
      this.userProfile.birthday = dayjs(val).format('YYYY-MM-DD')
      this.showBirthday = false
    },
    // 修改性别
    onSelect (val) {
      this.userProfile.gender = val.name === '男' ? 0 : 1
      // 关闭弹层
      this.showSex = false
    },
    // 获取用户资料的方法
    async getUserProfile () {
      this.userProfile = await apiUserProfile()
      // 获取用户资料的生日时间
      this.nowDate = new Date(this.userProfile.birthday)
    },

    // 更新用户资料
    async saveProfile () {
      await apiSaveProfile(this.userProfile)
      this.$toast.success('更新用户资料成功')
    }
  }
}
</script>

<style scoped lang='less'></style>
