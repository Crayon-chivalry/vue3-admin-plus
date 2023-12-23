<template>
  <div class="login">
    <div class="card">
      <div class="cover">
        <img src="@/assets/base/login-cover.png" class="cover-icon" />
      </div>

      <div class="form">
        <div class="title">Welcome Management System</div>
        <el-form ref="formRef" :model="form" :rules="rules">
          <el-form-item label="账号" prop="userid">
            <el-input v-model="form.userid" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" />
          </el-form-item>
        </el-form>
        <el-button type="primary" class="btn" @click="submit">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import md5 from 'blueimp-md5'
import { login } from '@/api/user'

const formRef = ref(null)

let form = reactive({
  userid: "",
  password: ""
});
let rules = {
  userid: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
  ]
}

function submit() {
  formRef.value.validate(async (valid, fields) => {
    if (valid) {
      let _password = md5(form.password)
      let data = await login(form.userid, _password)
      console.log(data)
      console.log(_password)
    }
  })
}
</script>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
}

.cover {
  padding: 40px 20px;
  display: flex;
  align-items: center;
}

.cover-icon {
  width: 280px;
}

.form {
  padding: 60px 60px 60px 20px;
}

.title {
  margin-bottom: 40px;
  color: var(--main-color);
  font-size: 16px;
  font-weight: bold;
}

.btn {
  width: 100%;
}

@media screen and (max-width: 450px) {
  .cover {
    display: none;
  }

  .form {
    padding: 40px 45px;
  }
}
</style>