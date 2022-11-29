
const state = {
    isSubmitting: false,
    isLoggedIn: false,
    currentUser: null,
    validationErrors: null
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
    }
}

const actions ={
    register(context,credentials){
        console.log('context', context)
        console.log('credentials', credentials)
        return context.commit('registerStart')
    },

    authorization(context,credentials) {
        console.log('context', context)
        console.log('credentials', credentials)
        return context.commit('registerSuccess')
    },

    logout(context){
        console.log('context', context)
        return context.commit('registerLogout')
    }

}



export default {
    state,
    mutations,
    actions
}