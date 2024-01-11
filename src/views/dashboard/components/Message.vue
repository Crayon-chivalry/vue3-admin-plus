<template>
  <div class="m-block mt-md">
    <div>消息动态</div>
    <div class="msg-list">
      <div class="msg-item" v-for="item in 6" :key="item">
        <div class="msg-item-row">
          <el-tag class="mr-sm" type="warning">订单</el-tag>
          <div>
            订单号<span class="number">D2155111233</span>已签收
          </div>
        </div>
        <div class="msg-date">03-23 17:23</div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.msg-item {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  cursor: pointer;
}

.msg-item:first-child {
  margin-top: 20px;
}

.msg-item .number {
  padding: 0 4px;
  color: var(--main-color);
}

.msg-item-row {
  display: flex;
  align-items: center;
}

.msg-date {
  color: gray;
}
</style>