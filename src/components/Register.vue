<template>
<div>
  <form v-if="!userAccount.doctor && !userAccount.patient"> 
    <input type="checkbox" name="patient" v-model="userAccount.patient">I am a patient<br>
    <input type="checkbox" name="doctor" v-model="userAccount.doctor">I am a doctor<br>
  </form>
  <form class="auth-form f-dir-col" @submit.prevent="register" v-else>
    <label>Username:</label>
    <input type="text" v-model="username" required>
    <br>
    <label>Password:</label>
    <input type="password" v-model="password" required>
    <br>
    <label>Confirm Password:</label>
    <input type="password" v-model="confirmPass" required>
    <br>
    <label>Your Name:</label>
    <input type="text" v-model="name" required>
    <br>
    <label>Your Second Name:</label>
    <input type="text" v-model="secondName" required>
    <br>
    <label v-if="userAccount.doctor">Your qualification:</label>
    <input v-if="userAccount.doctor" type="text" v-model="qualification" required>
    <label v-if="userAccount.patient">Your Card Number:</label>
    <input v-if="userAccount.patient" type="text" v-model="cardNumber" required>
    <br>
    <label>Contact Phone Number:</label>
    <input type="text" v-model="phoneNumber" required>
    <br>
    <button type="submit">Register</button>
  </form>
</div>
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
      qualification: '',
      cardNumber: 0,
      phoneNumber: 0,
      secondName: '',
      userAccount: {
        doctor: false,
        patient: false
      }
    }
  },
  methods: {
    register () {
      const patientSignUpData = { 
        username: this.username,
        password: this.password,
        name: this.name,
        secondName: this.secondName,
        phoneNumber: this.phoneNumber,
        cardNumber: this.cardNumber,
        doctor: false
      }
      const doctorSignUpData = {
        username: this.username,
        password: this.password,
        name: this.name,
        secondName: this.secondName,
        phoneNumber: this.phoneNumber,
        qualification: this.qualification,
        doctor: true
      }
      if (this.password === this.confirmPass) {
        api()
          .post(`/register`, this.userAccount.doctor ? doctorSignUpData : patientSignUpData, {
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



