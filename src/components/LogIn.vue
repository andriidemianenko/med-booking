<template>
  <form class="auth-form f-dir-col" @submit.prevent="login">
    <label>Email:</label>
    <input type="email" v-model="email" required><br/>
    <label>Password:</label>
    <input type="password" v-model="password" required><br/>
    <button type="submit">Log In</button>
  </form>
</template>
<script>
import api from '@/services/api.js'

export default {
  name: 'LogIn',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      const userAuthData = {
        email: this.email,
        password: this.password
      }
      api()
        .post(`/login`, userAuthData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(({ data }) => {
          localStorage.setItem('auth_token', data.auth_token)
        })
    }
  }
}
</script>

