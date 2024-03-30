const state = {
  visitedViews: [], // 标签栏导航
  cachedViews: [], // 缓存页面
}

const mutations = {
  // 添加标签栏
  addVisitedViews(state, content) {
    console.log('addVisitedViews', state)
    const tag = state.visitedViews.find(item => {
      return item.path == content.path
    })
    if(!tag) state.visitedViews.push(content)
  },
  // 移除标签栏
  removeVisitedViews(state, content) {
    if(content.type === 'index') {
      state.visitedViews.splice(content.index, 1)
    }
    if(content.type === 'other') {
      state.visitedViews = state.visitedViews.filter((item, index) => {
        return visitedViews === content.index || (item.meta && item.meta.affix)
      })
    }
    if(content.type === 'all') {
      state.visitedViews = state.visitedViews.filter(item => {
        return item.meta && item.meta.affix
      })
    }
  },
  // 添加缓存视图
  addCachedViews(state, view) {
    if(state.cachedViews.includes(view.name)) return
    if(!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  // 移除缓存视图
  removeCachedViews(state, view) {
    let name = state.tagsViewList[view.index].name
    let fIndex = state.cachedViews.findIndex(item => item == name)
    if(fIndex != -1) {
      state.cachedViews.splice(fIndex, 1)
    }
  },
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}