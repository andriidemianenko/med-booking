<template>
  <v-layout wrap>
    <v-navigation-drawer dark :clipped="clipped" app enable-resize-watcher v-model="drawer">
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ profileData.name }} {{ profileData.secondName }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile v-for="item in filteredMenuItems" :key="item.title" @click="navigateTo(item.link)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>{{ currentPage }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="logout" color="primary">LOGOUT</v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view :accountType="$route.params.user" :userId="$route.params.userId"></router-view>
      </v-container>
    </v-content>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      clipped: false,
      drawer: false,
      pageTitle: '',
      menuItems: [{
        title: 'Profile',
        icon: 'person',
        link: 'profile'
      },
      {
        title: 'Calendar',
        icon: 'date_range',
        link: 'calendar'
      },
      {
        title: 'Your Meetings',
        icon: 'list',
        link: 'meetings'
      },
      {
        title: 'List of Doctors',
        icon: 'how_to_reg',
        link: 'doctors'
      },
      {
        title: 'My Inbox',
        icon: 'email',
        link: 'inbox'
      }]
    }
  },
  computed: {
    profileData () { return this.$store.getters.getUserProfile },
    accountType () { return localStorage.getItem('accountType') },
    filteredMenuItems () {
      if (this.profileData.accountType === 'doctor') {
        return this.menuItems.filter(menuItem => menuItem.title !== 'List of Doctors')
      } else {
        return this.menuItems
      }
    },
    userId () { return localStorage.getItem('userId') },
    currentPage: {
      get: function () {
        return  this.pageTitle
      },
      set: function (newVal) {
        this.pageTitle = newVal.charAt(0).toUpperCase() + newVal.slice(1)
      }
    }
  },
  methods: {
    navigateTo (link) {
      this.$router.replace({ path: link })
      this.currentPage = link
    },
    fetchUserProfile () {
      axios
        .get(`/${this.accountType}/${this.userId}/userData`)
        .then(({ data }) => {
          let profileData = data.profileData
          profileData.accountType = profileData.qualification ? 'doctor' : 'patient' 
          this.$store.commit('setUserProfile', data.profileData)
        })
        .catch(err => {
          this.$router.push('/login')
          this.$store.commit('clearData')
        })
    },
    fetchDoctorsList () {
      axios
        .get(`/doctors`)
        .then(({ data }) => {
          this.$store.commit('setDoctorsList', data.doctors)
        })
    },
    logout () {
      localStorage.removeItem('accountType')
      localStorage.removeItem('auth_token')
      localStorage.removeItem('userId')
      this.$store.commit('clearData')
      this.$router.push('/login')
    },
    setPageTitle () {
      const currentRoute = this.$router.history.current.path
      const pageRegExp = /[\s\S]*\/(doctor|patient)\/[\s\S]+?\/(\w*)?/
      const currentPage = currentRoute.match(pageRegExp)[2]
      this.currentPage = currentPage ? currentPage : ''
    }
  },
  created () {
    this.fetchUserProfile()
    this.setPageTitle()
    this.fetchDoctorsList()
  }
}
</script>

