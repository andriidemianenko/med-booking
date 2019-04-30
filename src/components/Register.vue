<template>
  <div>
    <form v-if="!userAccount.doctor && !userAccount.patient">
      <v-checkbox
        v-model="userAccount.patient"
        label="I am a patient"
        data-vv-name="checkbox"
        required
      ></v-checkbox>
      <v-checkbox
        v-model="userAccount.doctor"
        label="I am a doctor"
        type="checkbox"
        required
      ></v-checkbox>
    </form>
    <v-card class="elevation-12" v-else>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Register form</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            name="Email"
            label="Email"
            v-model="email"
            type="email"
          ></v-text-field>
          <v-text-field
            id="password"
            name="password"
            v-model="password"
            label="Password"
            type="password"
          ></v-text-field>
          <v-text-field
            name="confirm"
            label="Confirm Password"
            v-model="confirmPass"
            type="password"
          ></v-text-field>
          <v-text-field
            name="name"
            v-model="name"
            label="Your Name"
            type="text"
          ></v-text-field>
          <v-text-field
            name="secondName"
            label="Your Second Name"
            v-model="secondName"
            type="text"
          ></v-text-field>
          <v-text-field
            v-if="userAccount.doctor"
            name="qualification"
            label="Your Qualification"
            v-model="qualification"
            type="text"
          ></v-text-field>
          <v-text-field
            v-if="userAccount.patient"
            name="cardNumber"
            label="Enter Your MedCard Number"
            v-model="cardNumber"
            type="number"
          ></v-text-field>
          <v-text-field
            name="phoneNumber"
            v-model="phoneNumber"
            label="Your Phone Number"
            type="number"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="register">Register</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Register",
  data() {
    return {
      email: '',
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
    register() {
      const patientSignUpData = {
        email: this.email,
        password: this.password,
        name: this.name,
        secondName: this.secondName,
        phoneNumber: this.phoneNumber,
        cardNumber: this.cardNumber,
        doctor: false
      }
      const doctorSignUpData = {
        email: this.email,
        password: this.password,
        name: this.name,
        secondName: this.secondName,
        phoneNumber: this.phoneNumber,
        qualification: this.qualification,
        doctor: true
      }
      if (this.password === this.confirmPass) {
        axios
          .post(
            `/register`,
            this.userAccount.doctor ? doctorSignUpData : patientSignUpData,
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(({ data }) => {
            console.log(data)
          })
      }
    }
  }
}
</script>



