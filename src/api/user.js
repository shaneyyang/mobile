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
