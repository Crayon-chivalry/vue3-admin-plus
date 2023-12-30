const getters = {
  token: state => state.user.token,
  userid: state => state.user.userid,
  roles: state => state.user.roles,
}

export default getters