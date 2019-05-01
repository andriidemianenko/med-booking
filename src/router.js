import Vue from 'vue'
import Router from 'vue-router'
import AuthPage from './views/AuthPage.vue'
import LogIn from './components/LogIn.vue'
import Register from './components/Register.vue'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'AuthPage',
      component: AuthPage,
      children: [
        {
          path: 'login',
          component: LogIn
        },
        {
          path: 'register',
          component: Register
        }
      ]
    },
    {
      path: '/:user/:userId/home',
      name: 'Home',
      component: Home
    }
  ]
})
