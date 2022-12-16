<template>
  <div class="chat" >
    <div class = "chats-list" id="todo-list-example">
      <h3>Список чатов</h3>
      <form class="chat-form" v-on:submit.prevent="addNewNote">
        <!--        <label for="new-note">Добавить задачу</label>-->
        <input class="chat-name-placeholder"
               v-model="findUser"
               id="new-note"
               placeholder="Впиши название логина пользователя"
        />
        <div class="chat-submit" @click="addNewNote" >
          <img src="/icons/carbon_add-alt.svg" width="30" height="30" >
        </div>

      </form>
      <ul class="chat-list-present">
        <mcv-chat-item
            v-for="(chat,index) in allChats"
            :key="chat.userId"
            :title="chat.userLogin"
            :chat="chat"
            @remove="deleteNote(allChats,index,1)"
            @click="selectChat(chat, index)"
            v-bind:class="{'note-active-item': index === activeIndex}"
        ></mcv-chat-item>
      </ul>

    </div>

    <div class="chats-content">
      <div class="chat-message-list">
      <ul >
        <mcv-messages-chat
            v-for="(chat) in currentSelectChat.messages"
            :key="chat.id"
            :message="chat.msg"
            :iSent = "chat.userFromId === this.currentUser.id"
        ></mcv-messages-chat>
      </ul>
      </div>
      <div class="send-field">
        <textarea class="message-form"
                  placeholder="Напиши ему все что думаешь (о нем)"
        v-model="textAreaMessage">MESSAGE-FORM</textarea>
        <div class="message-send"
        @click="dontReadMsg">MESSAGE-SEND</div>

      </div>


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
      activeIndex: '',
      textAreaMessage: ''
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
    },


  },

  methods:{

    dontReadMsg(){
      let countDontRead = 0
      for (let i = 0; i < this.allChats.length; i++) {
        for (let j = 0; j < this.allChats[i].messages.length; j++) {
          if( this.allChats[i].messages[j].read === false){
            countDontRead++
          }
        }
      }
      console.log('countDontRead',countDontRead)
      return countDontRead
    },

    downloadChats(){
      this.$store.dispatch('getAllUserChats', this.$store.state.auth.currentUser)

    },
    selectChat(chat, index){
      this.activeIndex = index
      this.$store.commit('changeSelectedChat', chat)
      //this.$store.commit('changeSelectedNote',chat)
      // this.$store.dispatch('getChatMessages',{currentUserId: this.$store.state.auth.currentUser.id,
      //                                         anotherUserId: chat.userId})
      console.log('activeIndex', this.activeIndex)
      console.log('chat', chat)
      console.log('current user', this.currentUser.id)

    },
    sendMsg(){
      console.log('sendMsg', this.textAreaMessage)
      let msg = {
        id: '',
        userFromId: this.currentUser.id,
        userToId: this.currentSelectChat.userId,
        msg: this.textAreaMessage,
        createdAt: '',
        downloaded:'',
        read:''
      }
      this.$store.dispatch('sendMsg',msg)
      this.textAreaMessage = ''
    }
  },


  mounted() {
   // this.downloadChats()
  },





  components: {
    McvChatItem,
    McvMessagesChat
  }


}
</script>