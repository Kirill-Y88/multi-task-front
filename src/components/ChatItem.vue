<template>
  <li class="note-item"   >
    <div class="note-title">{{title}}</div>
  </li>
</template>

<script>

export default {
  name: 'McvChatItem',
  props: ['title', 'iSent'],

}

</script>


<style>
li {
  list-style-type: none;
}
</style>