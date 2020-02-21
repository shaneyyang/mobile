// 导入axios方法
import request from '../utils/request'

export function apiUserLogin ({ mobile, code }) {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data: {
      // 对象成员简易赋值
      mobile,
      code
    }
  })
}
/**
 * 关注作者
 * @param {target} 被关注用户id
 */
export function apiFollow (target) {
  return request({
    method: 'post',
    url: '/app/v1_0/user/followings',
    data: {
      // 成员简易赋值
      target
    }
  })
}

/**
 * 取消关注作者
 * @param {target} 取消关注用户id
 */
export function apiUnFollow (target) {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/followings/${target}`
  })
}

/**
 * api:获取用户自己信息
 * 接口文档的目标id 不用传->忽略
 * 接口：【获取用户自己信息】
 */
export const apiUserInfo = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'GET'
  })
}

/**
 * 获取用户个人资料
 */
export function apiUserProfile () {
  return request({
    url: '/app/v1_0/user/profile', // 地址
    method: 'get'
  })
}
/**
 * 上传用户头像
 * @param {FormData对象，拥有photo成员，代表被上传头像的文件对象} fdObj
 * FormData是html5发布的技术
 * 可以实现普通表单域信息 和 上传文件域信息的收集工作
 */
export function apiUserPhoto (fdObj) {
  return request({
    url: '/app/v1_0/user/photo', // 编辑头像的地址
    method: 'patch', // 设置头像的类型
    data: fdObj
  })
}
/**
 * 更新用户资料
 * @param {用户昵称} name
 * @param {用户性别} gender
 * @param {生日} birthday
 */
export function apiSaveProfile ({ name, gender, birthday }) {
  return request({
    url: '/app/v1_0/user/profile', // 编辑资料的地址
    data: {
      name,
      gender,
      birthday
    },
    method: 'patch'
  })
}
