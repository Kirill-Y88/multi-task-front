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
        <div class="chat-submit" @click="addNewUserToChat" >
          <img src="/icons/carbon_add-alt.svg" width="30" height="30" >
        </div>
        <mcv-chat-system-info-item v-if="!isFindUser"></mcv-chat-system-info-item>

      </form>
      <ul class="chat-list-present">
        <mcv-chat-item
            v-for="(chat,index) in allChats"
            :key="chat.userId"
            :title="chat.userLogin"
            :chat="chat"
            @click="selectChat(chat, index)"
            v-bind:class="{'note-active-item': index === activeIndex}"
        ></mcv-chat-item>
      </ul>

    </div>

   <template v-if="currentSelectChat!==null">
    <div class="chats-content">
      <div class="chat-message-list">
      <ul class="chat-message-list-ul" id="message-list">
        <mcv-messages-chat
            v-for="(chat) in currentSelectChat.messages"
            :key="chat.id"
            :message="chat.msg"
            :iSent = "chat.userFromId === this.currentUser.id"
        ></mcv-messages-chat>
      </ul>
      </div>
      <div class="send-field">
        <textarea maxlength="1000"
                  @keyup.ctrl.enter.prevent="sendMsg"
                  class="message-form"
                  placeholder="Напиши ему все что думаешь (о нем)"
        v-model="textAreaMessage">MESSAGE-FORM</textarea>
        <div class="message-send"
        @click="sendMsg">
          <img src="/icons/send.svg">
          SEND
        </div>
      </div>
    </div>
   </template>


  </div>






</template>

<script>
//import McvNoteItem from '@/components/NoteItem.vue'
import McvChatItem  from '@/components/ChatItem.vue'
import McvMessagesChat from '@/components/MessagesChat.vue'
import McvChatSystemInfoItem  from '@/components/ChatSystemInfoItem.vue'


export default {
  name: 'McvChat',

  data() {
    return {
      findUser:'',
      activeIndex: '',
      textAreaMessage: '',
      time:null
    }
  },


  computed:{

    isFindUser(){
      return this.$store.state.chat.isFindUser
    },

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

    moveScroll(){
     this.time = setTimeout( () => {
          let chat = document.getElementById("message-list")
          chat.scrollTop = chat.scrollHeight
         },100
     )
    },


    addNewUserToChat(){
      console.log('addNewUserToChat this.findUser',this.findUser)
      this.$store.dispatch('findUserToChat', this.findUser)

    },

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

    refreshChats(){
      this.$store.dispatch('startSurvey', this.$store.state.auth.currentUser)


    },

    selectChat(chat, index){
      this.activeIndex = index
      //this.$store.commit('changeSelectedChat', chat)
      this.$store.dispatch('readMsgInSelectedChat', chat)
      //this.$store.commit('changeSelectedNote',chat)
      // this.$store.dispatch('getChatMessages',{currentUserId: this.$store.state.auth.currentUser.id,
      //                                         anotherUserId: chat.userId})
      this.moveScroll()
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
   // this.refreshChats()
    this.moveScroll()
  },





  components: {
    McvChatItem,
    McvMessagesChat,
    McvChatSystemInfoItem
  }


}
</script>