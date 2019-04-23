<template>
  <div class="auth-container f-justify-center f-dir-col f-align-center">
    <h1>Welcome, please authorize!</h1>
    <div class="form-container">
      <router-view></router-view>
    </div>
    <router-link to="/register">Dont't have account? Register!</router-link>
    <router-link to="/login">Already have account? Login!</router-link>
  </div>
</template>

<script>
import postServices from '@/services/postServices'

export default {
  name: 'AuthPage',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    
  },
  created () {

  }
}
</script>
<style scoped>
.auth-container {
  display: flex;
  width: 100%;
  height: 90vh;
}
.form-container {
  width: 30%;
  height: auto;
  padding: 10px;
  border: 1px solid #000;
}
.auth-form {
  display: flex;
}
</style>

