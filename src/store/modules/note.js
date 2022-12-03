
const state = {

    //newNoteText: '',
    notes: [
        {
            id: 1,
            title: 'Do the dishes',
            content: 'hdhahhhdhehh'
        },
        {
            id: 2,
            title: 'Take out the trash',
            content: 'hdhhwyqqqdhfdh'
        },
        {
            id: 3,
            title: 'Mow the lawn',
            content: 'hwwytryethdfh'
        }
    ],
    nextNoteId: 4,
    selectedNoteId: 0,
    selectedNote:{}

}

const actions = {


}

const mutations = {
    addNewNote(state, title){
        state.notes.push({
            id: state.nextNoteId,
            title: title,
            content: ''
        })
        state.nextNoteId++
    },
    changeSelectedNote(state,  note){
        state.selectedNoteId = note.id
        state.selectedNote = note
    },


}




export default {
    state,
    actions,
    mutations
}