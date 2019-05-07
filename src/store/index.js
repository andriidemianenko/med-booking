import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    meetings: [],
    userProfile: {},
    doctors: []
  },
  getters: {
    getMeetings: state => state.meetings,
    getUserProfile: state => state.userProfile,
    getDoctorsList: state => state.doctors
  },
  mutations: {
    setUserProfile: (state, payload) => {
      state.userProfile = payload
    },
    setUserMeetings: (state, meetings) => {
      state.meetings = meetings
    },
    setDoctorsList: (state, doctors) => {
      state.doctors = doctors
    },
    addMeeting: (state, meeting) => {
      state.meetings.push(meeting)
    },
    cancelMeeting: (state, cancelMeetingId) => {
      state.meetings = state.meetings.filter(meeting => meeting._id !== cancelMeetingId)
    },
    clearData: (state) => {
      state.meetings = []
      state.doctors = []
      state.userProfile = {}
    }
  },
  actions: {

  }
})

export default store
