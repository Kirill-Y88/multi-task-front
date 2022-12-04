<template >

  <div class="note" >
    <div class = "notes-list" id="todo-list-example">
      <h3>Список заметок</h3>
      <form class="note-form" v-on:submit.prevent="addNewNote">
<!--        <label for="new-note">Добавить задачу</label>-->
        <input class="note-name-placeholder"
            v-model="newNoteText"
            id="new-note"
            placeholder="Впиши название заметки"
        />
        <div class="note-submit" @click="addNewNote" >
          <img src="/icons/carbon_add-alt.svg" width="30" height="30" >
        </div>

      </form>
      <ul>
        <mcv-note-item
            v-for="(note,index) in notes"
            :key="note.id"
            :title="note.title"
            @remove="notes.splice(index, 1)"
            @click="selectNote(note)"
        ></mcv-note-item>
      </ul>

    </div>
    <div class="notes-content">
<!--      {{currentSelectedNoteTitle}}-->
<!--      {{currentNoteContent}}-->
      <div class="note-title">{{currentSelectedNoteTitle}} </div>
      <textarea v-model="this.$store.state.note.selectedNote.content"
                class="note-text-area"></textarea>
      <div class="note-send" @click="addNewNote" >
        <img src="/icons/carbon_add-alt.svg" width="30" height="30" >
      </div>
    </div>

  </div>


</template>

<script>
import McvNoteItem from '@/components/NoteItem.vue'




export default {
  name: 'McvNote',

  data() {
    return {
       newNoteText: '',
 //      notes: this.$store.state.note.notes,
  //     nextNoteId: this.$store.state.note.nextNoteId,

    }
  },
  computed:{
    currentSelectedNoteId(){
      return this.$store.state.note.selectedNoteId
    },
    currentNoteContent(){
      return this.$store.state.note.selectedNote.content
    },
    notes(){
      return this.$store.state.note.notes
    },
    currentSelectedNoteTitle(){
      return this.$store.state.note.selectedNote.title
    },
    isLoggedIn(){
      return this.$store.state.auth.isLoggedIn
    },
  },


  methods: {

    addNewNote() {
        this.$store.commit('addNewNote', this.newNoteText)
      this.newNoteText = ''
    },
    selectNote(note){
      this.$store.commit('changeSelectedNote',note)
      console.log('note', note)
      console.log('content',this.currentNoteContent)
    }

  },


  components: {
    McvNoteItem
  }








}



</script>