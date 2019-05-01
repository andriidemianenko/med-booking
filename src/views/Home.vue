<template>
  <v-layout wrap>
    <v-navigation-drawer absolute permanent>
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

        <v-list-tile v-for="item in menuItems" :key="item.title" @click="navigateTo(item.link)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      menuItems: [{
        title: 'Profile',
        icon: 'person',
        link: '/profile'
      },
      {
        title: 'Your Meetings',
        icon: 'date_range',
        link: '/meetings'
      },
      {
        title: 'List of Doctors',
        icon: 'how_to_reg',
        link: '/doctors'
      }]
    }
  },
  computed: {
    profileData () { return this.$store.getters.getUserProfile }
  },
  methods: {
    navigateTo (link) {
      // this.$router.push(this.$router.history.current.path + link)
    },
    fetchUserProfile () {
      const accountType = localStorage.getItem('accountType')
      const userId = localStorage.getItem('userId')
      axios
      .get(`/${accountType}/${userId}/home`)
      .then(({ data }) => {
        this.$store.commit('setUserProfile', data.profileData)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.fetchUserProfile()
  }
}
</script>

