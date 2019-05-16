<template>
  <v-container>
    <v-list two-line v-if="messages.length">
      <template v-for="(message, index) in messages">
        <v-divider v-if="index !== 0" :key="index"></v-divider>
        <v-list-tile :key="message.id" @click>
          <v-list-tile-content>
            <v-list-tile-title>{{ message.sender_name }}</v-list-tile-title>
            <v-list-tile-sub-title :class="{'canceled-meeting': message.type === 'cancel', 'accepted-meeting': message.type === 'accept'}" >{{ message.message }}</v-list-tile-sub-title>
          </v-list-tile-content>
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
      messages: []
    }
  },
  methods: {
    fetchInbox() {
      axios
        .get(`/${this.userId}/inbox`).then(({ data }) => {
        this.messages = data.messages
      })
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
