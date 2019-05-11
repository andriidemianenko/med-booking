<template>
  <v-sheet height="850">
    <v-calendar ref="calendar" :now="today" :value="today" color="primary" type="week">
      <!-- the meetings at the top (all-day) -->
      <template v-slot:dayHeader="{ date }">
        <template v-for="meeting in meetingsMap[date]">
          <!-- all day meetings don't have time -->
          <div
            v-if="!meeting.time"
            :key="meeting.title"
            class="my-meeting"
            @click="open(meeting)"
            v-html="meeting.title"
          ></div>
        </template>
      </template>
      <!-- the meetings at the bottom (timed) -->
      <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
        <template v-for="meeting in meetingsMap[date]">
          <!-- timed meetings -->
          <div
            v-if="meeting.time"
            :key="meeting.title"
            :style="{ top: timeToY(meeting.time) + 'px', height: minutesToPixels(meeting.duration) + 'px' }"
            class="my-meeting with-time"
            @click="open(meeting)"
            v-html="meeting.title"
          ></div>
        </template>
      </template>
    </v-calendar>
  </v-sheet>
</template>
<script>
import moment from 'moment'

export default {
  data () {
    return {}
  },
  computed: {
    // convert the list of meetings into a map of lists keyed by date
    meetingsMap () {
      const map = {}
      let meetings = this.meetings.slice()
      meetings.forEach(meeting => (map[meeting.date] = map[meeting.date] || []).push(meeting))
      return map
    },
    meetings () { return this.$store.getters.getMeetings },
    today () { return moment().format('YYYY-MM-DD') }
  },
  mounted () {
    this.$refs.calendar.scrollToTime('08:00')
  },
  methods: {
    open (meeting) {
      alert(meeting.title)
    }
  }
}
</script>
<style scoped>
.my-meeting {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}
.my-meeting.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>


