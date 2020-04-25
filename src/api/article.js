import request from '@/utils/request'

// 获取文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    params
  })
}

// 获取文章频道
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章接口
export const deleteArticle = articleId => {
  return request({
    method: 'DELETE',
    // 接口文档中的写的路径参数需要在 url 中传递
    // 凡是看见接口路径中有的 :xxx 格式的字段，则需要传递路径参数
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 新建文章
export const addArticle = (data, draft = false) => {
  // console.log(data)
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}

// 编辑文章
export const updateArticle = (articleId, data, draft = false) => {
  // console.log(data)
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data
  })
}

// 获取指定的文章
export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
