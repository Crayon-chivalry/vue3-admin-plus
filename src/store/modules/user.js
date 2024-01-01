import { login, getUserInfo } from '@/api/user'
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
    commit('setToken', '1111')
  },
  async getInfo({ commit }, form) {
    let { data } = await getUserInfo()
    console.log(data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}