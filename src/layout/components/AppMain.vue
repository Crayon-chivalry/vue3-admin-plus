<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="key"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()

const cachedViews = computed(() => {
  console.log('cachedViews', store.getters.cachedViews)
  return store.getters.cachedViews
})

const key = computed(() => {
  return route.path
})
</script>

<style scoped>
.app-main {
  overflow: hidden;
}

.fade-leave-active,
.fade-enter-active {
  transition: all .5s;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>