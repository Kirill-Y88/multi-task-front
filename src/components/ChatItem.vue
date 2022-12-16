<template>
  <li class="chat-item"   >
<!--    <div class="chat-title"> ///-->
      <div class = "chat-title"> {{title}}</div>
    <template v-if="countDontReadMsg!==0">
      <div class="count-dont-read-message">{{countDontReadMsg}}</div>
    </template>
<!--    </div>-->
  </li>
</template>

<script>




export default {
  name: 'McvChatItem',
  props: ['title', 'chat'],

  computed:{

    allChats(){
      return this.$store.state.chat.allChats
    },
      countDontReadMsg(){
     return this.chat.chatDontRead
    },



  }






}





</script>


<style>
li {
  list-style-type: none;
}
</style>