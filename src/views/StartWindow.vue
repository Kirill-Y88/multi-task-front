<template>
  <div class="start-window">
    <h2>START WINDOW</h2>
      <div v-if="!isLoggedIn">
        <p class="font_2" >Вход не выполнен</p>
        <router-link v-bind:to="{name: 'authorization'}">Auto</router-link>
          <span>| |</span>
        <router-link v-bind:to="{name: 'registration'}">Regist</router-link>
      </div>
<!--    <button @click="tempGetAllUsers"> TEST getAllUsers</button>-->
    <p class="font_2" v-if="isLoggedIn">Здравствуй, дорогой {{currentUser.login}}!</p>
  </div>


</template>

<script>
export default {
  name: 'McvStartWindow',

  computed: {
    isLoggedIn(){
      return this.$store.state.auth.isLoggedIn
    },
    currentUser(){
      return this.$store.state.auth.currentUser
    }
  },

  methods: {
    tempGetAllUsers(){
      this.$store.dispatch('getAllUserNotes', this.$store.state.auth.currentUser)
    }
  }

}

</script>