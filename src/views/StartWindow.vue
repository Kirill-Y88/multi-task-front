<template>
  <div>
    START WINDOW
    Вход не выполнен
    <router-link v-bind:to="{name: 'authorization'}">Auto</router-link>

    <router-link v-bind:to="{name: 'registration'}">Regist</router-link>

  </div>


</template>

<script>
export default {
  name: 'McvStartWindow',

  computed: {
    isLoggedIn(){
      return this.$store.state.auth.isLoggedIn
    },
  }
}

</script>