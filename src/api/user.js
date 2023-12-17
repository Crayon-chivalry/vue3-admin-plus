import { request } from './requset'

export function login(userid, password) {
  return request({
    method: 'post',
    url: '/userAdmin/login',
    data: {
      userid,
      password
    }
  })
}

