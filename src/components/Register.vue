<template>
  <form class="auth-form f-dir-col" @submit.prevent="register">
    <label>Username:</label>
    <input type="text" v-model="username" required><br/>
    <label>Password:</label>
    <input type="text" v-model="password" required><br/>
    <label>Confirm Password:</label>
    <input type="text" v-model="confirmPass" required><br/>
    <label>Your Name:</label>
    <input type="text" v-model="name" required><br/>
    <label>Your Second Name:</label>
    <input type="text" v-model="secondName" required><br/>
    <label>Contact Phone Number:</label>
    <input type="text" v-model="phoneNumber" required><br/>
    <button type="submit">Register</button>
  </form>
</template>

<script>
import api from '@/services/api.js'

export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password: '',
      confirmPass: '',
      name: '',
      secondName: '',
      phoneNumber: '',
    }
  },
  methods: {
    register () {
      if (this.password === this.confirmPass) {
        api()
          .post(`/register`, { 
              username: this.username,
              password: this.password,
              confirmPass: this.confirmPass,
              name: this.name,
              secondName: this.secondName,
              phoneNumber: this.phoneNumber
            }, {
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
}
</script>


