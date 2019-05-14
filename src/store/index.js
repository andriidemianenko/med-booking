import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userProfile: {},
    doctors: []
  },
  getters: {
    getUserProfile: state => state.userProfile,
    getDoctorsList: state => state.doctors
  },
  mutations: {
    setUserProfile: (state, payload) => {
      state.userProfile = payload
    },
    setDoctorsList: (state, doctors) => {
      state.doctors = doctors
    },
    updateProfile: (state, payload) => {
      state.userProfile.name = payload.name
      state.userProfile.secondName = payload.secondName
      state.userProfile.cardNumber = payload.cardNumber
      state.userProfile.phoneNumber = payload.phoneNumber
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
