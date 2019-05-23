<template>
  <v-card>
    <v-card-title>
      <span class="headline">Meeting Editor</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <pick-date @date="changeDate"></pick-date>
          </v-flex>
          <v-flex xs12>
            <pick-time @time="changeTime"></pick-time>
          </v-flex>
          <v-flex xs12>
            <v-autocomplete
              :items="doctorsNames"
              label="Doctor*"
              v-model="editorFields.doctorName"
              prepend-icon="perm_contact_calendar"
              required
            ></v-autocomplete>
          </v-flex>
          <v-flex xs12>
            <v-textarea
              name="description"
              box
              height="120"
              label="Describe the reason of the meeting"
              v-model="editorFields.description"
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>
      <small class="error-msg" v-show="errorMessage.length">{{ errorMessage }}</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat @click="closeEditor">Close</v-btn>
      <v-btn flat @click="addNewMeeting" :disabled="disabledBtn">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from 'axios'
import moment from 'moment'

import PickTime from './PickTime.vue'
import PickDate from './PickDate.vue'

export default {
  name: 'MeetingEditor',
  components: { PickTime, PickDate },
  data() {
    return {
      editorFields: {
        doctorName: '',
        date: '',
        description: '',
        time: '',
      },
      disabledBtn: true,
      errorMessage: ''
    }
  },
  computed: {
    userProfileData () { return this.$store.getters.getUserProfile },
    userId () { return localStorage.getItem('userId') },
    doctors () { return this.$store.getters.getDoctorsList },
    getCurrentTime () { return moment().format('YYYY-MM-DD HH:mm') },
    doctorsNames () { return this.doctors.map(doctor => `${doctor.name} ${doctor.second_name}`) }
  },
  watch: {
    editorFields : {
        handler (val) {
          if (val.date.length && val.time.length && val.description.length && val.doctorName.length) {
            this.disabledBtn = false
          } else {
            this.disabledBtn = true
          }
          if (val.date && val.time) {
            const time = moment(`${val.date} ${val}`, 'YYYY-MM-DD HH:mm')
            const currentTime = moment(this.getCurrentTime, 'YYYY-MM-DD HH:mm')
            const isCorrectTime = time.isBefore(this.currentTime)
            if (isCorrectTime) {
              this.errorMessage = 'You cannot set the meeting before today\'s date!'
              this.disabledBtn = true
            } else {
              this.errorMessage = ''
            }
          }
        },
        deep: true
    }
  },
  methods: {
    addNewMeeting () {
      for (let doctor of this.doctors) {
        if (`${doctor.name} ${doctor.second_name}` === this.editorFields.doctorName.trim()) {
          axios
            .post(`/meetings`, {
              doctor_name: this.editorFields.doctorName.trim(),
              patient_name: `${this.userProfileData.name} ${this.userProfileData.secondName}`,
              date: this.editorFields.date,
              description: this.editorFields.description,
              time: this.editorFields.time,
              doctor_id: doctor._id,
              patient_id: this.userId
            })
            .then(({ data }) => {
              this.$emit('editor', { editor: false, meeting: data.meeting })
              this.$store.commit('addMeeting', data.meeting)
              this.clearEditor()
            })
            .catch(err => {
              console.log(err)
              this.clearEditor()
            })
            break
        }
      }
    },
    clearEditor () {
      this.editorFields.doctorName = '',
      this.editorFields.description = '',
      this.editorFields.date = '',
      this.editorFields.time = ''
    },
    changeTime (val) {
      this.editorFields.time = val
    },
    changeDate (val) {
      this.editorFields.date = val
    },
    closeEditor () {
      this.$emit('editor', { editor: false, meeting: null })
    }
  }
}
</script>
<style scoped>
.error-msg {
  color: #ff0000;
}
</style>
