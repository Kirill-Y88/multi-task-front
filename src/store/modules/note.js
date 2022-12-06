import nodeAPI from "@/api/nodeAPI";

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
    downloadNote(state, payload){
        state.notes = payload
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


}




export default {
    state,
    actions,
    mutations
}