<template>
  <v-container grid-list-xl>
    <v-layout justify-space-between wrap>
      <v-flex xs5>
        <v-flex xs12>
          <v-text-field v-model="profileFields.name" label="Your Name"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="profileFields.secondName" label="Your Second Name"></v-text-field>
        </v-flex>
      </v-flex>
      <v-flex xs5>
        <v-flex xs12>
          <v-text-field v-model="profileFields.cardNumber" v-if="accountType === 'patient'" label="Your Card Number"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="profileFields.phoneNumber" label="Your Telephone Number"></v-text-field>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-layout justify-end>
      <v-btn color="success" :disabled="!changed" @click="updateProfile">UPDATE</v-btn>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
import { setTimeout } from 'timers';

export default {
  props: ['accountType'],
  data() {
    return {
      profileFields: {
        name: '',
        secondName: '',
        cardNumber: 0,
        phoneNumber: 0,
      },
      changed: false,
    }
  },
  computed: {
    profileData () { return this.$store.getters.getUserProfile },
    userId () { return localStorage.getItem('userId') }
  },
  watch: {
    profileFields: {
      handler (val) {
        const currentProfile = this.profileData
        const namesChanged = (val.name !== currentProfile.name || val.secondName !== currentProfile.secondName)
        const cardOrPhoneChanged = (+val.cardNumber !== currentProfile.cardNumber || +val.phoneNumber !== currentProfile.phoneNumber)
        if (namesChanged || cardOrPhoneChanged) {
          this.changed = val.name && val.secondName && val.phoneNumber && val.cardNumber
        } else {
          this.changed = false
        }
      },
      deep: true
    }
  },
  methods: {
    updateProfile() {
      axios
        .post(`${this.profileData.accountType}/${this.userId}/update-profile`, { ...this.profileFields })
        .then(({ data }) => {
          this.$store.commit('updateProfile', { ...this.profileFields })
          this.changed = false
        })
    },
    fetchProfileFields () {
      this.profileFields.name = this.profileData.name
      this.profileFields.secondName = this.profileData.secondName
      this.profileFields.cardNumber = this.profileData.cardNumber
      this.profileFields.phoneNumber = this.profileData.phoneNumber
    }
  },
  created () {
    this.fetchProfileFields()
  }
}
</script>
