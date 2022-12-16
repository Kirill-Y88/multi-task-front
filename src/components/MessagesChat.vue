<template>
  <li class="chat-item"   >
    <div class="chat-title message"
         :class="{'my-message': iSent, 'another-message': !iSent }"
         >{{ message }}</div>
  </li>
</template>

<script>

export default {
  name: 'McvMessagesChat',
  props: ['message', 'iSent'],

}

</script>


<style>
li {
  list-style-type: none;
}
</style>