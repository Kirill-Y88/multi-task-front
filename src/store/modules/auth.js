import authAPI from "@/api/authAPI";
import {setItem} from "@/helpers/persistanceStorage";

const state = {
    isSubmitting: false,
    isLoggedIn: false,
    currentUser: null,
    validationErrors: null,

}


const mutations = {
    registerStart(state){
        state.isSubmitting = true
        state.validationErrors = null
    },
    registerSuccess(state,payload){
        state.isSubmitting = false;
        state.currentUser = payload
        state.isLoggedIn = true
    },
    registerFailure(state,payload){
        state.isSubmitting = false;
        state.currentUser = null
        state.isLoggedIn = false
        state.validationErrors = payload
    },
    registerLogout(state){
        state.isSubmitting = false;
        state.currentUser = null
        state.isLoggedIn = false
    },

}

// const getters = {
//     currentUser: state => {
//         return state.currentUser
//     }
// }

const actions ={
    register(context,credentials){
        console.log('context', context)
        console.log('credentials', credentials)
        return context.commit('registerStart')
    },

    authorization(context,credentials) {
//
        return new Promise(resolve => {
            context.commit('registerStart')
            authAPI.authorization(credentials)
                .then(response =>{
                    console.log('response', response)
                    context.commit('registerSuccess', response.data.user)
                    setItem('accessToken', response.data.token)
                    resolve(response.data.user)
                })
                .catch(result =>{
                    context.commit('registerFailure', result.response.data.errors)
                    console.log('result errors', result)
                })
        })
    },

    logout(context){
        console.log('context', context)
        return context.commit('registerLogout')
    },
    login(context){
        console.log('context', context)
        return context.commit('registerSuccess')
    },
    tempRequest(context, user){
        return new Promise( () =>{
            context.commit('registerStart')
            authAPI.tempGetAllUsers(user)
                .then(response => {
                    context.commit('downloadNode',response.data)
                    console.log('response' , response)
                    console.log('responseData' , response.data)
                })
                .catch(result => {
                    console.log('result errors', result)
                })
        } )
    }

}



export default {
    state,
    mutations,
    actions,
   // getters
}