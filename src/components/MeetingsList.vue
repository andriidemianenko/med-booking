<template>
  <v-layout wrap>
    <v-dialog v-if="accountType === 'patient'" v-model="editor" width="600">
      <template v-slot:activator="{ on }">
        <v-btn color="green lighten-2" dark v-on="on">ADD NEW MEETING</v-btn>
      </template>
      <meeting-editor @editor="editorData"></meeting-editor>
    </v-dialog>
    <v-container>
      <v-list three-line v-if="meetings.length">
        <template v-for="(meeting, index) in meetings">
          <v-divider v-if="index !== 0" :key="index"></v-divider>
          <!-- <v-list-tile :key="meeting.id" avatar @click> -->
          <v-list-tile :key="meeting.id" @click>
            <!-- <v-list-tile-avatar>
              <img src="../../public/favicon.ico">
            </v-list-tile-avatar> -->

            <v-list-tile-content>
              <v-list-tile-title>{{ accountType === 'doctor' ? meeting.patient_name : meeting.doctor_name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ meeting.date }}, {{ meeting.time }}, cabinet: {{ meeting.cabinetNo }}</v-list-tile-sub-title>
              <v-list-tile-sub-title :class="{ 'meeting-disabled': !meeting.isActive, 'meeting-active': meeting.isActive }">
                <b>STATUS:</b> {{ meeting.isActive ? 'Accepted!' : 'Yet not accepted...' }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn v-if="accountType === 'doctor' && !meeting.isActive" @click="acceptMeeting(meeting)" color="success">ACCEPT</v-btn>
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
  props: ['accountType', 'userId'],
  data() {
    return {
      editor: false,
      meetings: []
    }
  },
  computed: {
    userProfileData () { return this.$store.getters.getUserProfile },
    // meetings () { return this.$store.getters.getMeetings }
  },
  methods: {
    editorData (val) {
      this.editor = val.editor
      if (val.meeting) {
        this.meetings.push(val.meeting)
      }
    },
    cancelMeeting (choosenMeeting) {
      axios
        .delete(`/delete/meeting/${choosenMeeting._id}`)
        .then(({ data }) => {
          this.meetings = this.meetings.filter(meeting => meeting._id !== choosenMeeting._id)
        })
    },
    acceptMeeting (choosenMeeting) {
      axios
        .put(`/meetings/${choosenMeeting._id}`, {
          isActive: true
        })
        .then(({ data }) => {
          console.log(data)
        })
    },
    fetchMeetings () {
      axios
        .get(`/${this.accountType}/${this.userId}/meetings`)
        .then(({ data }) => {
          this.meetings = data.meetings
        })
    }
  },
  created () {
    this.fetchMeetings()
  }
}
</script>
<style scoped>
.meeting-disabled {
  color: #ff5252 !important;
}
.meeting-active {
  color: #81c784 !important;
}
</style>


