<template>
  <v-dialog
    ref="dialog"
    v-model="timePicker"
    :return-value.sync="time"
    persistent
    lazy
    full-width
    width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="time"
        label="Picker in dialog"
        prepend-icon="access_time"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker v-if="timePicker" v-model="time" full-width>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="timePicker = false">Cancel</v-btn>
      <v-btn flat color="primary" @click="setTime">OK</v-btn>
    </v-time-picker>
  </v-dialog>
</template>

<script>
export default {
  name: 'PickTime',
  data() {
    return {
      time: null,
      timePicker: false
    }
  },
  methods: {
    setTime () {
      this.$emit('time', this.time)
      this.$refs.dialog.save(this.time)
    }
  }
}
</script>