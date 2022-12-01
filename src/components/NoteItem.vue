<template>
  <li class="note-item">
    <div class="note-title">{{ title }}</div>
    <div class="note-delete" @click="$emit('remove')">
      <img src="/icons/iconoir_bin-full.svg" >
    </div>
  </li>
</template>

<script>

export default {
  name: 'McvNoteItem',
  props: ['title'],
  emits: ['remove']
}

</script>

<style>
li {
  list-style-type: none;
}
</style>