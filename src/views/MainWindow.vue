<template>




<div class ="main">

  <div class ="main-panel">
    <div class = main-icons-top-bottom>
      <div class = "main-icons" @click="pressBut">
        <img src="/icons/note.svg">
      </div>
      <div class = "main-icons" @click = "pressBut">
        <img src="/icons/chat.svg">
      </div>
      <div class = "main-icons" @click = "pressBut">
        <img src="/icons/finance.svg">
      </div>
      <div class = "main-icons" @click = "pressBut">
        <img src="/icons/news.svg">
      </div>

      <div class = "main-icons" @click = "pressBut">
        <img src="/icons/carbon_add-alt.svg">
      </div>
    </div>

    <div class = main-icons-top-bottom>
      <div class = "main-icons" @click = "pressBut">
        <img src="/icons/profile.svg">
      </div>

      <div class = "main-icons" @click = "pressBut">
        <img src="/icons/signout.svg">
      </div>
    </div>

  </div>

  <div  class = "main-app-window">
    Главное окно приложения {{isContButton}} раз {{isCount}} count
  </div>
</div>
</template>

<script>
export default {
  name: 'MainWindow',
  computed:{
    isContButton(){
      return this.$store.state.main.countButton
    },
    isCount(){
      return this.$store.state.count
    }
  },
  methods:{
    pressBut(){

      this.$store.commit('pressButton')
      this.$store.commit('increment')
      console.log('press', this.$store.state.main.countButton)
      console.log('press count', this.$store.state.count)
    }

  }

}






</script>

<style>



</style>