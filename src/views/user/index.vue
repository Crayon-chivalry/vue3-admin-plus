<template>
  <div>
    <div class="m-block">

    </div>
    
    <div class="m-block mt-md">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="cdate" label="Date" />
        <el-table-column prop="userid" label="用户名" />
        <el-table-column prop="name" label="姓名" />
      </el-table>
    </div>
  </div>
</template>

<script setup>
let tableData = [
  {cdate: "2023-12-05", name: "老王", userid: "14152526363"},
  {cdate: "2023-12-04", name: "王五", userid: "17552425323"},
  {cdate: "2023-12-02", name: "李四", userid: "18152521242"}
]
</script>

<style scoped>
</style>