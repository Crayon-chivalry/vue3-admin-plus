<template>
  <div class="menu">
    <div class="menu-item" @click="onRefreshClick">刷新</div>
    <div class="menu-item" v-if="!isAffix(tag)" @click="onClose">关闭</div>
    <div class="menu-item" @click="onCloseOther">关闭其他</div>
    <div class="menu-item" @click="onCloseAll">关闭所有</div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

let props = defineProps({
  index: {
    type: Number,
    required: true
  },
  tag: {
    type: Object,
    required: true
  }
})

const store = useStore()
const router = useRouter()
const route = useRoute()

const isAffix = (_tag) => {
  return _tag.meta && _tag.meta.affix
}

// 刷新
const onRefreshClick = () => {
  router.go(0)
}

// 关闭
const onClose = () => {
  let tagsViewList = store.state.tagsViewList
  let tag = tagsViewList[props.index]
  store.commit('removeVisitedViews', { type: 'index', index: props.index })
  if(tag.path === route.path) {
    router.push(tagsViewList[props.index - 1].path)
  }
}

// 关闭其他
const onCloseOther = () => {
  let tagsViewList = store.state.tagsViewList
  let tag = tagsViewList[props.index]
  store.commit('removeVisitedViews', { type: 'other', index: props.index })
  router.push(tag.path)
}

// 关闭所有
const onCloseAll = () => {
  store.commit('removeVisitedViews', { type: 'all' })
  let tagsViewList = store.state.tagsViewList
  router.push(tagsViewList[tagsViewList.length - 1].path)
}
</script>

<style scoped>
  .menu {
    position: absolute;
    padding: 5px 0;
    font-size: 12px;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    background-color: #fff;
    z-index: 99;
  }

  .menu-item {
    padding: 7px 16px;
    cursor: pointer;
  }
  
  .menu-item:hover {
    background: #eee;
  }
</style>