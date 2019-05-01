<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login form</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field prepend-icon="person" name="Email" label="Email" v-model="email" type="email"></v-text-field>
        <v-text-field
          id="password"
          prepend-icon="lock"
          name="password"
          v-model="password"
          label="Password"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from 'axios'

export default {
  name: 'LogIn',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      const userAuthData = {
        email: this.email,
        password: this.password
      }
      this.$validator.validateAll()
      axios
        .post(`/login`, userAuthData, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(({ data }) => {
          const userId = data._id
          const accountType = data.account
          localStorage.setItem('auth_token', data.auth_token)
          localStorage.setItem('userId', userId)
          localStorage.setItem('accountType', accountType)
          this.$router.push(`/${accountType}/${userId}/home`)
        })
    }
  }
}
</script>

