const getters = {
  token: state => state.user.token,
  userid: state => state.user.userid,
  roles: state => state.user.roles,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
}

export default getters