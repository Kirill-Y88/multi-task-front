<template>
  <li class="note-item"   >
    <div class="note-title" :class="{'my-message': iSent }" >{{ title }}</div>
  </li>
</template>

<script>

export default {
  name: 'McvMessagesChat',
  props: ['title', 'iSent'],

}

</script>


<style>
li {
  list-style-type: none;
}
</style>