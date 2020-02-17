// 频道 相关的请求函数
import request from '@/utils/request' // 引入封装的模块

// 引入store
import store from '../store'
// 本地持久化存储频道设置的key(游客 和 登录用户 分别设置)
const CHANNEL_KEY_TRAVEL = 'hm-channel-travel' // 游客key
const CHANNEL_KET_VIP = 'hm-channel-vip' // 登录用户Key

// 添加频道
export function apiChannelAdd (channel) {
  return new Promise(function (resolve) {
    const key = store.state.user.token ? CHANNEL_KET_VIP : CHANNEL_KEY_TRAVEL // 获取缓存的key
    const localChannels = localStorage.getItem(key) // 获取缓存

    // 缓存有数据
    const channels = JSON.parse(localChannels)
    channels.push(channel) // 添加
    // 重新写入缓存
    localStorage.setItem(key, JSON.stringify(channels))
    // resolve是Promise成功执行的函数，由于执行成功并没有什么操作，所以里面内容为空
    resolve() // 成功执行
  })
}

// 获得频道列表
// 登录与否都可以获取数据
// 登录用户独立存储一份local数据
// 未登录用户独立存储一份local数据
export function apiChannelList () {
  // 判断是否有localStorage
  // 有的话就不需要发送请求

  return new Promise(async (resolve) => {
    // 判断用户是否登录，并执行不同的key
    const key = store.state.user.token ? CHANNEL_KET_VIP : CHANNEL_KEY_TRAVEL
    // 获取本地频道数据
    const localChannels = localStorage.getItem(key)
    if (localChannels) {
      // 输出频道数据给外部
      resolve({ channels: JSON.parse(localChannels) })
    } else {
      const result = await request({
        url: '/app/v1_0/user/channels',
        method: 'get'
      })
      // 本地存储频道数据
      localStorage.setItem(key, JSON.stringify(result.channels))
      // 输出频道数据给外部
      resolve(result)
    }
  })

  // return request({
  //   url: '/app/v1_0/user/channels',
  //   method: 'get' // 可以不设置，默认是get请求
  // })
}

// 获得全部频道列表

export function apiChannelAll () {
  return request(
    {
      url: '/app/v1_0/channels',
      method: 'get'
    })
}
