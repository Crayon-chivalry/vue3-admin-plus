const getters = {
  token: state => state.user.token,
  userid: state => state.user.userid,
  roles: state => state.user.roles,
  cachedViews: state => state.tagsView.cachedViews,
}

export default getters