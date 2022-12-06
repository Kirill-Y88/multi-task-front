import axios from '@/api/axios'

const register = credentials =>{
    return axios.post('/users',{user:credentials})
}

const authorization = credentials =>{
    return axios.post('/login',credentials)
}

const getCurrentUser = () => {
    return axios.get('/user')
}

const tempGetAllUsers = () =>{
   // return axios.get('api/v1/users')
    return axios.get('api/v1/notes')
}

export default {
    register,
    authorization,
    getCurrentUser,
    tempGetAllUsers
}