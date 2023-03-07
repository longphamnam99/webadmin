import request from '@/utils/request'
import { auth } from '@/helpers/auth.js'

export default {
  addNew(data) {
    return request({
      url: '/news/add',
      method: 'post',
      headers: auth(),
      data
    })
  }
}
