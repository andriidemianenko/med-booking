<template>
  <h1>Inbox is under construction</h1>
</template>
<script>
export default {
  data () {
    return {
      messages: []
    }
  },
  methods: {
    fetchInbox () {
      axios
        .get(`${this.accountType}/${this.userId}/inbox`)
        .then(({ data }) => {
          this.messages = data.messages
        })
    }
  }
}
</script>
