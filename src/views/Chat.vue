<template>
  <div class="note" >
    <div class = "notes-list" id="todo-list-example">
      <h3>Список чатов</h3>
      <form class="note-form" v-on:submit.prevent="addNewNote">
        <!--        <label for="new-note">Добавить задачу</label>-->
        <input class="note-name-placeholder"
               v-model="findUser"
               id="new-note"
               placeholder="Впиши название логина пользователя"
        />
        <div class="note-submit" @click="addNewNote" >
          <img src="/icons/carbon_add-alt.svg" width="30" height="30" >
        </div>

      </form>
      <ul class="note-list-present">
        <mcv-chat-item
            v-for="(chat,index) in allChats"
            :key="chat.userId"
            :title="chat.userLogin"
            @remove="deleteNote(allChats,index,1)"
            @click="selectChat(chat, index)"
            v-bind:class="{'note-active-item': index === activeIndex}"
        ></mcv-chat-item>
      </ul>

    </div>

    <div class="notes-content">
      <ul class="">
        <mcv-messages-chat
            v-for="(chat) in currentSelectChat.messages"
            :key="chat.id"
            :title="chat.msg"
            :iSent = "chat.userFromId === this.currentUser.id"
        ></mcv-messages-chat>
      </ul>


    </div>


  </div>






</template>

<script>
//import McvNoteItem from '@/components/NoteItem.vue'
import McvChatItem  from '@/components/ChatItem.vue'
import McvMessagesChat from '@/components/MessagesChat.vue'


export default {
  name: 'McvChat',

  data() {
    return {
      findUser:'',
      activeIndex: ''
    }
  },


  computed:{
    // allParticipants(){
    //   return this.$store.state.chat.allParticipants
    // },
    allChats(){
      return this.$store.state.chat.allChats
    },
    currentSelectChat(){
      return this.$store.state.chat.selectChat
    },
    currentUser(){
      return this.$store.state.auth.currentUser
    }

  },

  methods:{
    downloadChats(){
      this.$store.dispatch('getAllUserChats', this.$store.state.auth.currentUser)
    },
    selectChat(chat, index){
      this.activeIndex = index
      this.$store.commit('changeSelectedChat', chat)
      //this.$store.commit('changeSelectedNote',chat)
      this.$store.dispatch('getChatMessages',{currentUserId: this.$store.state.auth.currentUser.id,
                                              anotherUserId: chat.userId})
      console.log('activeIndex', this.activeIndex)
      console.log('chat', chat)
      console.log('current user', this.currentUser.id)
     // console.log('currentSelectChat.messages.userFromId', this.currentSelectChat.messages.userFromId)
     // console.log('content',this.currentNoteContent)
    }


  },


  mounted() {
    this.downloadChats()
  },





  components: {
    McvChatItem,
    McvMessagesChat
  }


}
</script>