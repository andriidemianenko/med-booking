<template>
  <v-container>
    <v-dialog v-model="messageDialog" width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ accountType === 'doctor' ? choosenMeeting.patient_name : choosenMeeting.doctor_name }}</span>
          </v-card-title>
          <v-card-text>
            <p><b>Time:</b> {{ choosenMeeting.time }}</p>
            <p><b>Date:</b> {{ choosenMeeting.date }}</p>
            <p><b>Description:</b> {{ choosenMeeting.description }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="messageDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
    <v-list two-line v-if="messages.length">
      <template v-for="(message, index) in messages">
        <v-divider v-if="index !== 0" :key="index"></v-divider>
        <v-list-tile :key="message.id" @click>
          <v-list-tile-avatar>
            <img v-if="accountType === 'patient'" src="https://s3.ap-south-1.amazonaws.com/doctorinsta-com/doctorinsta-front/others.png">
            <img v-else src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ message.sender_name }}</v-list-tile-title>
            <v-list-tile-sub-title :class="{'canceled-meeting': message.type === 'cancel', 'accepted-meeting': message.type === 'accept'}" >{{ message.message }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn @click="openMeetingInfo(message.meeting_info)" color="primary">INFO</v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
    <h1 v-else>There no messages for you!</h1>
  </v-container>
</template>
<script>
import axios from 'axios'

export default {
  props: ['accountType', 'userId'],
  data() {
    return {
      messages: [],
      messageDialog: false,
      choosenMeeting: {}
    }
  },
  computed: {
    meetings () { return this.$store.getters.getMeetings }
  },
  methods: {
    fetchInbox() {
      axios
        .get(`/${this.userId}/inbox`).then(({ data }) => {
        this.messages = data.messages
      })
    },
    openMeetingInfo (meetingInfo) {
      console.log(meetingInfo)
      console.log(this.messages)
      this.choosenMeeting = meetingInfo
      this.messageDialog = true
    }
  },
  created () {
    this.fetchInbox()
  }
}
</script>
<style scoped>
.canceled-meeting {
  color: #ff0000 !important;
}
.accepted-meeting {
  color: #81c784 !important;
}
</style>
