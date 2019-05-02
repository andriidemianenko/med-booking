<template>
  <v-list two-line>
    <template v-for="meeting in meetings">
      <!-- <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider> -->
      <v-list-tile :key="meeting.id" avatar @click="">
        <v-list-tile-avatar>
          <!-- <img src="../../public/favicon.ico"> -->
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ meeting.doctorName }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ meeting.date }}, {{ meeting.startsAt }}, {{ meeting.cabinetNo }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  data () {
    return {
      meetings: [
        {
          doctorName: 'Andrei Demianenko',
          date: '12-02-2019',
          startsAt: '16:40',
          id: '123asd',
          cabinetNo: '323'
        },
        {
          doctorName: 'Alexander Smeshko',
          date: '15-03-2019',
          startsAt: '13:40',
          id: '234sad',
          cabinetNo: '424'
        }
      ]
    }
  }
}
</script>

