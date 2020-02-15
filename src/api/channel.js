// 频道 相关的请求函数
import request from '@/utils/request' // 引入封装的模块

// 获得频道列表
export function apiChannelList () {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'get' // 可以不设置，默认是get请求
  })
}

// 获得全部频道列表
export function apiChannelAll () {
  return request(
    {
      url: '/app/v1_0/channels',
      method: 'get'
    })
}
