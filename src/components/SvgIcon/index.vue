<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$attrs">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
 
<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})
 
const iconName = computed(() => {
  return `#icon-${props.icon}`
})

const svgClass = computed(() => {
  if(props.className) {
    return 'svg-icon ' + props.className
  } else {
    return 'svg-icon'
  }
})
</script>
 
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>