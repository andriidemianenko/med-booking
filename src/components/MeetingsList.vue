<template>
  <v-layout wrap>
    <v-dialog v-model="editor" width="600">
      <template v-slot:activator="{ on }">
        <v-btn color="green lighten-2" dark v-on="on">ADD NEW MEETING</v-btn>
      </template>
      <meeting-editor></meeting-editor>
    </v-dialog>
    <v-container>
      <v-list two-line>
        <template v-for="meeting in meetings">
          <!-- <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider> -->
          <v-list-tile :key="meeting.id" avatar @click>
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
    </v-container>
  </v-layout>
</template>

<script>
import MeetingEditor from './MeetingEditor.vue'

export default {
  components: { MeetingEditor },
  data() {
    return {
      editor: false,
      meetings: [
        {
          doctorName: "Andrei Demianenko",
          date: "12-02-2019",
          startsAt: "16:40",
          id: "123asd",
          cabinetNo: "323"
        },
        {
          doctorName: "Alexander Smeshko",
          date: "15-03-2019",
          startsAt: "13:40",
          id: "234sad",
          cabinetNo: "424"
        }
      ]
    };
  }
};
</script>

