<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <div class ="main font_2">
    <main-window/>

<!--    <template v-if="isLoggedIn">-->
    <router-view/>
<!--    </template>-->


  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import MainWindow from "@/views/MainWindow.vue";
//import StartWindow from "@/views/StartWindow.vue";

export default {
  name: 'App',
  components: {
    MainWindow,
    //StartWindow
    // HelloWorld

  },
  computed: {
    isLoggedIn(){
      return this.$store.state.auth.isLoggedIn
    },
  },

  mounted(){
    this.$router.push({name: 'home'})
  },



}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/


}

</style>
