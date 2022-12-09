import nodeAPI from "@/api/nodeAPI";

const state = {
    //newNoteText: '',
    notes: [
        // {
        //     id: 1,
        //     title: 'Do the dishes',
        //     content: 'hdhahhhdhehh'
        // },

    ],
    nextNoteId: 4,
    selectedNoteId: 0,
    selectedNote: {}

}



const mutations = {
    addNewNote(state, payload){
        console.log('state', state)
        console.log('title', payload.title)
        console.log('user', payload.userId)
        state.notes.push({
            id: -1,
            title: payload.title,
            content: '',
            userId: payload.userId
        })

    },
    changeSelectedNote(state,  note){
        state.selectedNoteId = note.id
        state.selectedNote = note
    },
    addIdSelectedNote(state, id){
      state.selectedNote.id = id;
    },
    downloadNote(state, payload){
        state.notes = payload
    },
    clearNote(state){
        state.notes = []
    }

}
const actions = {

    getAllUserNotes(context, user){
        return new Promise( () =>{
            context.commit('registerStart')
            nodeAPI.getAllUsersNote(user)
                .then(response => {
                    context.commit('downloadNote',response.data)
                    console.log('response' , response)
                    console.log('responseData' , response.data)
                })
                .catch(result => {
                    console.log('result errors', result)
                })
        } )
    },
    saveNote(context, note){
        console.log('saveNote context: ', context)

        console.log('saveNote note): ', note)
        return new Promise( () =>{
            nodeAPI.saveNote(note)
                .then(response => {
                    console.log('saveNote response: ', response)
                    if(response.data.status!==-1){
                    context.commit('addIdSelectedNote', response.data.status)}

                })
                .catch(result => {
                    console.log('result errors', result)
                })
        })
    },
    deleteNote(context, noteId){
        return new Promise(()=>{
            nodeAPI.deleteNoteById(noteId)
                .then(response => {
                    console.log('deleteNote response: ', response)
                })
                .catch(result => {
                    console.log('result errors', result)
                })
        })
    }



}




export default {
    state,
    actions,
    mutations
}