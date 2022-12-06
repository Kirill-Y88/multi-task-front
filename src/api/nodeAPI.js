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





export default {
    getAllUsersNote
}