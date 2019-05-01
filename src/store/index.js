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
    getDoctors: state => state.doctors
  },
  mutations: {
    setUserProfile: (state, payload) => {
      state.userProfile = payload
    }
  },
  actions: {

  }
})

export default store
