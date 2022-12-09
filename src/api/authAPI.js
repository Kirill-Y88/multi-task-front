import axios from '@/api/axios'

const register = credentials =>{
    return axios.post('/users',{user:credentials})
}

const authorization = credentials =>{
    return axios.post('/login',credentials)
}

const registration = credentials => {
    return axios.post('/signup', credentials)
}

const getCurrentUser = () => {
    return axios.get('/user')
}

const tempGetAllUsers = (currentUser) =>{
    console.log('WTF', currentUser.id)
    let config = {
        params: {
            userId: currentUser.id
        },
    }
   // return axios.get('api/v1/users')
    //return axios.get('api/v1/notes')
    return axios.get('api/v1/notes/userId', config)
}

export default {
    register,
    authorization,
    getCurrentUser,
    registration,
    tempGetAllUsers
}