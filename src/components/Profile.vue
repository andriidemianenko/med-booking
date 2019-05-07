<template>
  <v-container grid-list-xl>
    <v-layout justify-space-between wrap>
      <v-flex xs5>
        <v-flex xs12>
          <v-text-field v-model="name" label="Your Name"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="secondName" label="Your Second Name"></v-text-field>
        </v-flex>
      </v-flex>
      <v-flex xs5>
        <v-flex xs12>
          <v-text-field v-model="cardNumber" label="Your Card Number"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="phoneNumber" label="Your Telephone Number"></v-text-field>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-layout justify-end>
      <v-btn color="success" :disabled="changed">UPDATE</v-btn>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      secondName: '',
      cardNumber: 0,
      phoneNumber: 0,
      changed: true,
    }
  },
  computed: {
    profileData () { return this.$store.getters.getUserProfile }
  },
  methods: {
    updateProfile() {},
    fetchProfileFields () {
      this.name = this.profileData.name
      this.secondName = this.profileData.secondName
      this.cardNumber = this.profileData.cardNumber
      this.phoneNumber = this.profileData.phoneNumber
    }
  },
  created () {
    this.fetchProfileFields()
  }
}
</script>
