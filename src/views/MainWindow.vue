<template>
<!--<div class ="main">-->

  <div class ="main-panel">
    <div class = main-icons-top-bottom>
<!--      <div class = "main-icons" @click="pressNote">-->
<!--        <img src="/icons/note.svg">-->
<!--      </div>-->
      <div class = "main-icons" @click="pressNote">
<!--      <router-link v-bind:to="{name: 'note'}"  @click="pressNote">-->
        <img src="/icons/note.svg">
<!--      </router-link>-->
      </div>

      <div  class = "main-icons" id="icons-chat-div" @click = "pressChat">
        <template v-if="this.$store.getters.getCountDontReadMessages!==0">
        <div class="count-dont-read-message-all">{{this.$store.getters.getCountDontReadMessages}}</div>
        </template>
        <img id="icons-chat" src="/icons/chat.svg">
      </div>
<!--      <div  class = "main-icons" @click = "pressFConsultant">-->
<!--        <img src="/icons/finance.svg">-->
<!--      </div >-->
<!--      <div  class = "main-icons" @click = "pressNews">-->
<!--        <img src="/icons/news.svg">-->
<!--      </div >-->

      <div class = "main-icons" @click = "pressAdd">
        <img src="/icons/carbon_add-alt.svg">
      </div>
    </div>

    <div class = main-icons-top-bottom>
      <div  class = "main-icons" @click = "pressProfile">
        <img src="/icons/profile.svg">
      </div >

      <template v-if="isLoggedIn">
        <div class = "main-icons" @click = "pressLogout">
          <img src="/icons/signout.svg">
        </div>
      </template>

      <template v-if="!isLoggedIn">
        <div class = "main-icons" @click = "pressLogin">
          <img src="/icons/simple-line-icons_login.svg">
        </div>
      </template>


    </div>

  </div>

</template>

<script>


export default {
  name: 'MainWindow',
  components:{
    // McvNote,
    // McvChat,
    // McvFConsultant,
    // McvNews,
    // McvProfile
  },



  computed:{
    isContButton(){
      return this.$store.state.main.countButton
    },
    isCount(){
      return this.$store.state.count
    },
    isSubmitting(){
      return this.$store.state.auth.isSubmitting
    },
    isLoggedIn(){
      return this.$store.state.auth.isLoggedIn
    },
    currentUser(){
      return this.$store.state.auth.currentUser
    },
    validationErrors(){
      return this.$store.state.auth.validationErrors
    },

    countDontReadMessages(){
      return this.$store.state.chat.countDontReadMessages
    }
    // isNote(){
    //   return this.$store.state.isNote
    // },
    // isChat(){
    //   return this.$store.state.isChat
    // },
    // isFConsultant(){
    //   return this.$store.state.isFConsultant
    // },
    // isNews(){
    //   return this.$store.state.isNews
    // },
    // isProfile(){
    //   return this.$store.state.isProfile
    // },

  },
  methods:{
    pressBut(){

      this.$store.commit('pressButton')
      this.$store.commit('increment')
      console.log('press', this.$store.state.main.countButton)
      console.log('press count', this.$store.state.count)
    },
    pressAuthorization(){
      this.$store.dispatch('authorization')
    },
    pressLogout(){
      this.$store.dispatch('logout')
     // this.$route.push({name: 'hello'})
     // localStorage.clear()
      this.$store.commit('clearNote')
      this.$store.commit('chatListClear')
      this.$router.push({name: 'home'})
      //остановка опроса по чату
      this.$store.dispatch('stopSurvey')
      this.$store.commit('clearSelectChat')

    },
    pressLogin(){
      //this.$store.dispatch('login')
      // this.$route.push({name: 'hello'})
      this.$router.push({name: 'home'})
     // this.$store.commit('setMyInterval')
    }
    ,
    pressNote(){
      if(this.$store.state.auth.isLoggedIn) {
        this.$router.push({name: 'note'})
      }else {
        this.pressAdd()
      }
      // this.$store.commit('toNote')
    },
    pressChat(){
      if(this.$store.state.auth.isLoggedIn) {
      this.$router.push({name: 'chat'})
      }else {
        this.pressAdd()
      }
      // this.$store.commit('toChat')
    },
    pressFConsultant(){
      if(this.$store.state.auth.isLoggedIn) {
      this.$router.push({name: 'fconsultant'})
    }else {
      this.pressAdd()
    }
      // this.$store.commit('toFConsultant')
    },
    pressNews(){
      if(this.$store.state.auth.isLoggedIn) {
      this.$router.push({name: 'news'})
    }else {
    this.pressAdd()
  }
      // this.$store.commit('toNews')
    },
    pressAdd() {
     // this.$router.push({name: 'home'})
      //this.$store.dispatch('startSurvey', this.$store.state.auth.currentUser)
     // this.$store.dispatch('updateAllUserChats', this.$store.state.auth.currentUser)
    }
    ,
    pressProfile(){
      if(this.$store.state.auth.isLoggedIn) {
      this.$router.push({name: 'profile'})
      }else {
      this.pressAdd()
      }
      // this.$store.commit('toProfile')
    }
  },
}






</script>

<style>
</style>