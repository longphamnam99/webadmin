import request from '@/utils/request'
import { auth } from '@/helpers/auth.js'

export default {
  login(data) {
    return request({
      url: '/user/login',
      method: 'post',
      data
    })
  },
  getInfo() {
    return request({
      url: '/user/info',
      method: 'get',
      headers: auth()
    })
  },
  logout() {
    return request({
      url: '/user/logout',
      method: 'post',
      headers: auth()
    })
  }
}
