import axios from '@/api/axios'

const getAllUsersNote = (currentUser) =>{
    console.log('WTF', currentUser.id)
    let config = {
        params: {
            userId: currentUser.id
        },
    }
    return axios.get('api/v1/notes/userId', config)
}

const saveNote = (node) =>{
    return axios.post('/api/v1/notes/save',node)
}


const deleteNoteById = (noteId) => {
    let config = {
        params: {
            noteId: noteId
        },
    }
    return axios.delete('api/v1/notes/delete',config)
}


export default {
    getAllUsersNote,
    saveNote,
    deleteNoteById
}