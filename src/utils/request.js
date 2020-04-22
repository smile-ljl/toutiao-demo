import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const user = JSON.parse(window.localStorage.getItem('user'))

    // 如果有登录用户信息,则统一设置token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  }, function (error) {
    // 处理请求错误
    return Promise.reject(error)
  })
export default request
