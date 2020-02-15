// 文章 相关的请求函数
import request from '@/utils/request' // 引入封装的模块

// 根据频道获取文章列表
export function apiArticleList ({ channel_id, timestamp }) {
  return request({
    url: '/app/v1_1/articles',
    method: 'get',
    params: {
      channel_id,
      timestamp,
      with_top: 1
    }
  })
}

// 不感兴趣
export function apiArticleDislike (articleID) {
  return request({
    url: '/app/v1_0/article/dislikes',
    method: 'post',
    data: {
      target: articleID
    }
  })
}

// 举报
// 对象解构赋值可以传递默认值

export function apiArticleReport ({ articleID, type, remark = '' }) {
  return request({
    url: '/app/v1_0/article/reports',
    method: 'post',
    data: {
      target: articleID,
      type,
      remark // 其他问题 的附加说明
    }
  })
}
