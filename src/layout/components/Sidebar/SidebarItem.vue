<template>
  <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
    <el-menu-item class="menu-item" :index="resolvePath(onlyOneChild.path)" v-if="onlyOneChild.meta" @click="handleLink(onlyOneChild)">
      <svg-icon 
        :icon="onlyOneChild.meta.icon" 
        class="side-icon"
        :class="{'active-icon': route.path == resolvePath(onlyOneChild.path)}"
        v-if="onlyOneChild.meta.icon"
      >
      </svg-icon>
      <template #title>{{ onlyOneChild.meta.title }}</template>
    </el-menu-item>
  </template>

  <el-sub-menu v-else :index="resolvePath(item.path)">
    <template #title>
      <svg-icon :icon="item.meta.icon" class="side-icon"></svg-icon>
      <span>{{ item.meta.title }}</span>
    </template>
    <sidebar-item 
      v-for="item in item.children" 
      :key="item.path" 
      :item="item"
      :base-path="resolvePath(item.path)"
    >
    </sidebar-item>
  </el-sub-menu>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { resolve } from "@/utils/path"
import { isExternal } from '@/utils/validate'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  basePath: {
    type: String,
    default: ""
  }
})

const router = useRouter()
const route = useRoute()
let onlyOneChild = ref(null)

function handleLink(e) {
  let path = resolvePath(e.path)
  if(isExternal(path)) {
    window.open(path)
  } else {
    router.push(path)
  }
}

// 解析路径
function resolvePath(routePath) {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return resolve(props.basePath, routePath)
}

function hasOneShowingChild(children = [], parent) {
  const showingChildren = children.filter(item => {
    if (item.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })

  // 当只有一个子路由器时，默认情况下会显示子路由器
  if (showingChildren.length == 1) {
    return true
  }

  // 如果没有要显示的子路由器，则显示父路由器
  if (showingChildren.length == 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}
</script>

<style scoped>
.side-icon {
  margin-right: 6px;
  width: 20px;
  height: 20px;
}

.active-icon {
  color: var(--main-color);
}
</style>