import { request } from './request'

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

export function getUserInfo() {
  return request({
    url: '/userAdmin/userInfo'
  })
}

