import { login } from '@/api/user'
import md5 from 'blueimp-md5'

const state = {
  userid: '',
  token: ''
}

const mutations = {
  setUserid(state, userid) {
    state.userid = userid
  },
  setToken(state, token) {
    state.token = token
  }
}

const actions = {
  async login({ commit }, form) {
    let _password = md5(form.password)
    let { data } = await login(form.userid, _password)
    let { us, token } = data.data
    commit('setUserid', us.userid)
    commit('setToken', token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}