<template>
  <v-card>
    <v-card-title>
      <span class="headline">Meeting Editor</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field label="Date*" type="text" v-model="date" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Time*" type="text" v-model="time" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Cabinet Number*" type="number" v-model="cabinetNo" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              :items="doctorsNames"
              label="Doctor*"
              v-model="doctorName"
              required
            ></v-autocomplete>
          </v-flex>
        </v-layout>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat @click="dialog = false">Close</v-btn>
      <v-btn flat @click="addNewMeeting">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from "axios";

export default {
  name: 'MeetingEditor',
  data() {
    return {
      doctorName: '',
      date: '',
      cabinetNo: 0,
      time: ''
    }
  },
  computed: {
    userProfileData () { return this.$store.getters.getUserProfile },
    userId () { return localStorage.getItem('userId') },
    doctors () { return this.$store.getters.getDoctorsList },
    doctorsNames () { return this.doctors.map(doctor => `${doctor.name} ${doctor.second_name}`) }
  },
  methods: {
    addNewMeeting () {
      for (let doctor of this.doctors) {
        if (`${doctor.name} ${doctor.second_name}` === this.doctorName.trim()) {
          axios
            .post(`/meetings`, {
              doctor_name: this.doctorName.trim(),
              patient_name: `${this.userProfileData.name} ${this.userProfileData.secondName}`,
              cabinetNo: this.cabinetNo,
              date: this.date,
              time: this.time,
              doctor_id: doctor._id,
              patient_id: this.userId
            })
            .then(({ data }) => {
              this.$store.commit('addMeeting', data.meeting)
            })
            break
        }
      }
    }
  },
  created() {}
}
</script>

