<template>
  <v-menu
    ref="menu"
    v-model="pickDate"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="date"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field v-model="date" label="Date*" prepend-icon="event" readonly v-on="on"></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="pickDate = false">Cancel</v-btn>
      <v-btn flat color="primary" @click="setDate">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script>
export default {
  data() {
    return {
      date: '',
      pickDate: false
    }
  },
  methods: {
    setDate () {
      this.$emit('date', this.date)
      this.$refs.menu.save(this.date)
    }
  }
}
</script>

