<template>
  <v-layout>
    <v-container fluid>
      <v-list two-line v-if="doctors.length">
        <template v-for="doctor in doctors">
          <!-- <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider> -->
          <v-list-tile :key="doctor._id" avatar @click>
            <v-list-tile-avatar>
              <!-- <img src="../../public/favicon.ico"> -->
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ doctor.name }} {{ doctor.second_name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ doctor.qualification }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    doctors () { return this.$store.getters.getDoctorsList }
  }
}
</script>
