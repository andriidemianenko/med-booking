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
      doctorsNames: [],
      doctors: [],
      doctorName: '',
      date: '',
      cabinetNo: 0,
      time: ''
    }
  },
  computed: {
    userProfileData () { return this.$store.getters.getUserProfile },
    userId () { return localStorage.getItem('userId') }
  },
  methods: {
    fetchDoctorsList () {
      axios.get(`/doctors`)
        .then(({ data }) => {
          this.doctorsNames = data.doctors.map(doctor => `${doctor.name} ${doctor.second_name}`)
          this.doctors = data.doctors
        })
    },
    addNewMeeting () {
      for (let doctor of this.doctors) {
        if (`${doctor.name} ${doctor.second_name}` === this.doctorName.trim()) {
          console.log(this.userProfileData)
          axios
            .post(`/meetings`, {
              doctorName: this.doctorName.trim(),
              patientName: `${this.userProfileData.name} ${this.userProfileData.secondName}`,
              cabinetNo: this.cabinetNo,
              date: this.date,
              time: this.time,
              doctorId: doctor._id,
              patientId: this.userId
            })
            .then(({ data }) => {
              console.log(data)
            })
            break
        }
      }
    }
  },
  created() {
    this.fetchDoctorsList()
  }
}
</script>

