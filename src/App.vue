<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <main-window></main-window>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import MainWindow from "@/views/MainWindow.vue";

export default {
  name: 'App',
  components: {
    MainWindow,
    // HelloWorld
  }
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
