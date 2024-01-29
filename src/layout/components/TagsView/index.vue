<template>
  <div class="tags">
    <router-link 
      class="tags-item"
      :class="{'tags-active': activeRoute == item.path}"
      v-for="(item, index) in store.getters.visitedViews" 
      :key="item.path"
      :to="item.path"
      @contextmenu.prevent.native="openMenu(item, index ,$event)"
    >
      {{ item.meta.title }}
      <span class="close-icon" v-if="!item.meta.affix" @click.prevent.stop="onClose(item, index)">
        <!-- <el-icon size="9" :color="activeRoute == item.path ? '#fff': 'gray'">
          <Close />
        </el-icon> -->
      </span>
    </router-link>

    <context-menu 
      :style="menuStyle" 
      :index="selectIndex"
      :tag="selectItem"
      v-if="isVisible"
    ></context-menu>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ContextMenu from './ContextMenu'
import { resolve } from "@/utils/path"

const route = useRoute()
const router = useRouter()
const store = useStore()

const menuStyle = reactive({
  left: 0,
  top: 0
})
let selectItem = ref(null)
let selectIndex = ref(0)
let isVisible = ref(false)

let activeRoute = computed(() => {
  return route.path
})

// 监听路由变化
watch(route, (newPath) => {
  const { fullPath, meta, name, path } = newPath
  const view = { fullPath, meta, name, path }
  store.commit('tagsView/addVisitedViews', view)
  store.commit('tagsView/addCachedViews', view)
})

// 监听右键菜单
watch(isVisible, (newVal) => {
  if (newVal) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

onMounted(() => {
  initTags()
})

// 查找 Affix 固钉 路由
const filterAffixTags = (routes, basePath = '/') => {
  let tags = []
  routes.forEach(item => {
    if(item.meta && item.meta.affix) {
      const tagPath = resolve(basePath, item.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: item.name,
        meta: item.meta,
      })
    }
    if(item.children) {
      const tempTags = filterAffixTags(item.children, item.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

const initTags = () => {
  const affixTags = filterAffixTags(store.getters.roles)
  affixTags.forEach(item => {
    store.commit('addVisitedViews', {...item})
  })
  console.log('affixTags',affixTags)
}

const openMenu = (item, index, e) => {
  const { x, y } = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  selectIndex.value = index
  selectItem.value = item
  isVisible.value = true
}

const onClose = (tag, index) => {
  let tagsViewList = store.state.tagsViewList
  store.commit('removeCachedViews', { type: 'index', index })
  store.commit('removeVisitedViews', { type: 'index', index })
  if(tag.path === route.path) {
    router.push(tagsViewList[index - 1].path)
  }
}

const closeMenu = () => {
  isVisible.value = false
}
</script>

<style scoped>
.tags {
  height: 34px;
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}

.tags-item {
  display: flex;
  align-items: center;
  position: relative;
  font-size: 12px;
  cursor: pointer;
  height: 26px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  margin: 4px 5px 0;
  text-decoration: none;
  border-radius: 4px;
}

.tags-active {
  color: #fff;
  border-color: #409eff;
  background-color: #409eff;
}

.close-icon {
  margin: 1px 0 0 4px;
  width: 14px;
  height: 14px;
  text-align: center;
  line-height: 14px;
  border-radius: 50%;
}

.close-icon:hover {
  background-color: #a8abb2;
}
</style>