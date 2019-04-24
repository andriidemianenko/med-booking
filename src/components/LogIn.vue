<template>
  <form class="auth-form f-dir-col" @submit.prevent="login">
    <label>Username:</label>
    <input type="text" v-model="username" required><br/>
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
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      const userAuthData = {
        username: this.username,
        password: this.password
      }
      api()
        .post(`/login`, userAuthData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(({ data }) => {
          console.log(data)
        })
    }
  }
}
</script>

