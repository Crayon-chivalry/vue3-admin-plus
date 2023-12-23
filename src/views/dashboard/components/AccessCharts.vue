<template>
  <div class="m-block">
    <div>日活趋势</div>

    <div id="accessChart" class="chart"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, markRaw } from 'vue'
import * as echarts from 'echarts';

let myChart = ref(null)

onMounted(() => {
  initChart()
})

function initChart() {
  myChart.value = markRaw(echarts.init(document.getElementById('accessChart')));
  let options = {
    color: ['#FF3E50'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['平台日活']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '平台日活',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: {
          width: 1.2,
          color: '#FF3E50'
        },
        showSymbol: false,
        areaStyle: {
          color: '#FFE2E5'
        },
        emphasis: {
          disabled: true
        },
        data: [140, 232, 101, 264, 90, 340, 250]
      }
    ]
  }
  myChart.value.setOption(options);
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 300px;
}
</style>