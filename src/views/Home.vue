<template>
  <div class="main-container">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import postServices from '@/services/postServices'

export default {
  name: 'Home',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    getData () {
      postServices.fetchData()
        .then(({ data }) => {
          this.msg = data.message
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getData()
  }
}
</script>
