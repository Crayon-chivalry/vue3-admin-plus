<template>
  <div class="nav">
    <div class="nav-row">
      <div class="icon-wrap fold">
        <svg-icon icon="fold" className="fold-icon"></svg-icon>
      </div>
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item>首页</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="nav-row">
      <el-tooltip effect="dark" :content="toolTipText" placement="bottom">
        <div class="icon-wrap" @click="onFull">
          <svg-icon icon="full-screen-close" className="full-icon" v-if="screenState"></svg-icon>
          <svg-icon icon="full-screen" className="full-icon" v-else></svg-icon>
        </div>
      </el-tooltip>
      <div class="user">
        <img src="@/assets/svg/tx.svg" />
        <div class="user-name">admin</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import screenfull from 'screenfull'

const screenState = ref(false)

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  if (screenfull.isEnabled) {
    screenfull.off('change', fullChange)
  }
})

const toolTipText = computed(() => {
  return screenState.value ? '取消全屏' : '全屏'
})

const init = () => {
  if (screenfull.isEnabled) {
    screenfull.on('change', fullChange)
  }
}

const fullChange = () => {
  screenState.value = screenfull.isFullscreen
}

const onFull = () => {
  if (!screenfull.isEnabled) {
    ElMessage({
      message: '你的浏览器无法工作.',
      type: 'warning',
    })
    return false
  }
  screenfull.toggle()
}
</script>

<style scoped>
.nav {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: lighter;
}

.nav-row {
  height: 50px;
  display: flex;
  align-items: center;
}

.icon-wrap {
  padding: 0 10px;
  height: 100%;
  display: flex;
  align-items: center;
  color: rgb(70, 66, 66);
  cursor: pointer;
}

.fold {
  padding: 0 15px;
}

.fold-icon {
  width: 20px;
  height: 20px;
  color: #000;
}

.icon-wrap:hover {
  background-color: #F6F6F6;
}

.breadcrumb {
  margin-left: 10px;
}

.user {
  padding: 0 10px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user:hover {
  background-color: #F6F6F6;
}

.user img {
  display: block;
  width: 35px;
  height: 35px;
}

.user-name {
  margin-left: 6px;
  font-size: 14px;
}

.full-icon {
  width: 25px;
  height: 25px;
}
</style>