<template>
  <v-card>
    <v-card-title>
      <span class="headline">Meeting Editor</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field label="Date*" type="text" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Time*" type="text" required></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              :items="doctors"
              label="Doctor*"
            ></v-autocomplete>
          </v-flex>
        </v-layout>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat @click="dialog = false">Close</v-btn>
      <v-btn flat @click="dialog = false">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from "axios";

export default {
  name: 'MeetingEditor',
  data() {
    return {
      doctors: []
    }
  },
  methods: {
    fetchDoctorsList() {
      axios.get(`/doctors`).then(({ data }) => {
        this.doctors = data.doctors.map(doctor => `${doctor.name} ${doctor.second_name}`)
      })
    }
  },
  created() {
    this.fetchDoctorsList();
  }
}
</script>

