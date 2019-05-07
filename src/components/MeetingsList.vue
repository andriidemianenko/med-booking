<template>
  <v-layout wrap>
    <v-dialog v-model="editor" width="600">
      <template v-slot:activator="{ on }">
        <v-btn color="green lighten-2" dark v-on="on">ADD NEW MEETING</v-btn>
      </template>
      <meeting-editor @editor="close"></meeting-editor>
    </v-dialog>
    <v-container>
      <v-list two-line v-if="meetings.length">
        <template v-for="meeting in meetings">
          <!-- <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider> -->
          <v-list-tile :key="meeting.id" avatar @click>
            <v-list-tile-avatar>
              <!-- <img src="../../public/favicon.ico"> -->
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ userProfileData.accountType === 'doctor' ? meeting.patient_name : meeting.doctor_name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ meeting.date }}, {{ meeting.time }}, cabinet: {{ meeting.cabinetNo }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn @click="cancelMeeting(meeting)" color="error">CANCEL</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </v-container>
  </v-layout>
</template>

<script>
import MeetingEditor from './MeetingEditor.vue'
import axios from 'axios'

export default {
  components: { MeetingEditor },
  data() {
    return {
      editor: false
    }
  },
  computed: {
    userProfileData () { return this.$store.getters.getUserProfile },
    meetings () { return this.$store.getters.getMeetings },
    userId () { return localStorage.getItem('userId') }
  },
  methods: {
    close (val) {
      this.editor = val
    },
    cancelMeeting (meeting) {
      axios
        .delete(`/delete/meeting/${meeting._id}`)
        .then(({ data }) => {
          this.$store.commit('cancelMeeting', meeting._id)
          console.log(meeting._id, 'then')
        })
    }
  },
  mounted () {}
}
</script>

