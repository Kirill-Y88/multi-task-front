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

      <div  class = "main-icons" @click = "pressChat">
        <img src="/icons/chat.svg">
      </div>
      <div  class = "main-icons" @click = "pressFConsultant">
        <img src="/icons/finance.svg">
      </div >
      <div  class = "main-icons" @click = "pressNews">
        <img src="/icons/news.svg">
      </div >

      <div class = "main-icons" @click = "pressBut">
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

<!--  <div  class = "main-app-window">-->
<!--&lt;!&ndash;    Главное окно приложения {{isContButton}} раз {{isCount}} count&ndash;&gt;-->
<!--    <mcv-note v-if="isNote"></mcv-note>-->
<!--    <mcv-chat v-if="isChat"></mcv-chat>-->
<!--    <mcv-f-consultant v-if="isFConsultant"></mcv-f-consultant>-->
<!--    <mcv-news v-if="isNews"></mcv-news>-->
<!--    <mcv-profile v-if="isProfile"></mcv-profile>-->
<!--  </div>-->

<!--</div>-->
</template>

<script>
// import McvNote from '@/components/Note.vue'
// import McvChat from '@/components/Chat.vue'
// import McvFConsultant from '@/components/FConsultant.vue'
// import McvNews from '@/components/News.vue'
// import McvProfile from '@/components/Profile.vue'

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
      this.$router.go(0); //todo временно, т.к. не работает переход на home
    },
    pressLogin(){
      this.$store.dispatch('login')
      // this.$route.push({name: 'hello'})
      //this.$router.go(0); //todo временно, т.к. не работает переход на home
    }
    ,
    pressNote(){
      this.$router.push({name: 'note'})
      // this.$store.commit('toNote')
    },
    pressChat(){
      this.$router.push({name: 'chat'})
      // this.$store.commit('toChat')
    },
    pressFConsultant(){
      this.$router.push({name: 'fconsultant'})
      // this.$store.commit('toFConsultant')
    },
    pressNews(){
      this.$router.push({name: 'news'})
      // this.$store.commit('toNews')
    },
    pressProfile(){
      this.$router.push({name: 'profile'})
      // this.$store.commit('toProfile')
    }


  }

}






</script>

<style>
</style>