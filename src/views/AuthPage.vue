<template>
  <v-container fluid full-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <h1 class="f-justify-center">Welcome, please authorize!</h1>
        <router-view></router-view>
        <div class="f-justify-center">
          <v-btn to="/register">Dont't have account? Register!</v-btn>
          <v-btn to="/login">Already have account? Login!</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "AuthPage",
  data() {
    return {
      msg: ""
    };
  },
  methods: {},
  created() {}
};
</script>
<style scoped>
.f-justify-center {
  text-align: center;
}
</style>
