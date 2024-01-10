<template>
  <div class="m-block">
    <div>常用功能</div>
    <div class="tools-row">
      <div class="tools-col">
        <svg-icon icon="tools-order" className="tools-icon"></svg-icon>
        <div class="tools-text">订单查询</div>
      </div>
      <div class="tools-col">
        <svg-icon icon="tools-goods" className="tools-icon"></svg-icon>
        <div class="tools-text">商品管理</div>
      </div>
      <div class="tools-col">
        <svg-icon icon="tools-user" className="tools-icon"></svg-icon>
        <div class="tools-text">用户管理</div>
      </div>
      <div class="tools-col">
        <svg-icon icon="tools-order" className="tools-icon"></svg-icon>
        <div class="tools-text">暂定</div>
      </div>
      <div class="tools-col">
        <svg-icon icon="tools-order" className="tools-icon"></svg-icon>
        <div class="tools-text">暂定</div>
      </div>
      <div class="tools-col">
        <svg-icon icon="tools-order" className="tools-icon"></svg-icon>
        <div class="tools-text">暂定</div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.tools-row {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
}

.tools-col {
  padding: 10px 0;
  width: 33.3%;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
}

.tools-col:hover {
  border-radius: 4px;
  background-color: #F6F6F6;
}

.tools-icon {
  width: 25px;
  height: 25px;
}

.tools-text {
  margin-top: 6px;
}
</style>