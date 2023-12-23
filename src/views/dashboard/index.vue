<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="6" v-for="(item, index) in totalList" :key="index">
        <div class="m-block total-item">
          <div class="total-text">{{ item.text }}</div>
          <div class="mt-md">
            <el-statistic group-separator="," :precision="2" :value="item.value"></el-statistic>
          </div>
          <img :src="item.img" class="total-icon" />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="15" class="mt-md">
      <el-col :span="18">
        <sales-charts></sales-charts>
        <el-row :gutter="15" class="mt-md">
          <el-col :span="12">
            <access-charts></access-charts>
          </el-col>
          <el-col :span="12">
            <turnover-charts></turnover-charts>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import SalesCharts from './components/SalesCharts'
import AccessCharts from './components/AccessCharts'
import TurnoverCharts from './components/TurnoverCharts'

let totalList = [
  { text: '今日销售额', img: require('@/assets/logo.png'), value: 865400 },
  { text: '今日销售利润', img: require('@/assets/logo.png'), value: 865400 },
  { text: '今日订单数', img: require('@/assets/logo.png'), value: 865400 },
  { text: '今日新增用户', img: require('@/assets/logo.png'), value: 865400 },
]
</script>

<style scoped>
.total-item {
  position: relative;
}

.total-text {
  font-size: 13px;
}

.total-icon {
  position: absolute;
  right: 15px;
  top: 15px;
  width: 40px;
}
</style>