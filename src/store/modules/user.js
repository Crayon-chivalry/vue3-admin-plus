import { login } from '@/api/user'
import md5 from 'blueimp-md5'

const state = {
  userid: '',
  token: '',
  roles: []
}

const mutations = {
  setUserid(state, userid) {
    state.userid = userid
  },
  setToken(state, token) {
    state.token = token
  },
  setRoles(state, roles) {
    state.roles = roles
  }
}

const actions = {
  async login({ commit }, form) {
    let _password = md5(form.password)
    let { data } = await login(form.userid, _password)
    let token = data.data
    commit('setToken', token)
  },
  async getInfo({ commit }, form) {
    let testdata = require('@/assets/loginMockData')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('setRoles', testdata.roles)
        console.log('异步获取 usinfo 信息')
        resolve(testdata.roles)
      }, 500)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}