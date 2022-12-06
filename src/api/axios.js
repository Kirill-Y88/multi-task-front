import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage'

axios.defaults.baseURL = 'http://localhost:8083/mt/'

axios.interceptors.request.use(config =>{
    console.log('config', config)

    const token = getItem('accessToken')
    const authorizationToken = token ? `${token}` : ''
    console.log('token', token)
    console.log('authorizationToken', authorizationToken)
    config.headers.Authorization = authorizationToken
    return config
})

export default axios