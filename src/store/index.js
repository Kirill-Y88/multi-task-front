import { createStore } from 'vuex'
import main from '@/store/modules/main'
import auth from '@/store/modules/auth'

export default createStore({
    state: { /* для глобальных состояний */
        count: 0,
        isNote: false,
        isChat: false,
        isFConsultant: false,
        isNews: false,
        isProfile: false
    },
    getters: {

    },
    mutations: { /* для глобальных мутаций */
        increment(state){
            state.count++;
        },
        toNote(state){
            state.isNote = true
            state.isChat= false
            state.isFConsultant= false
            state.isNews= false
            state.isProfile= false
        },
        toChat(state){
            state.isNote = false
            state.isChat= true
            state.isFConsultant= false
            state.isNews= false
            state.isProfile= false
        },
        toFConsultant(state){
            state.isNote = false
            state.isChat= false
            state.isFConsultant= true
            state.isNews= false
            state.isProfile= false
        },
        toNews(state){
            state.isNote = false
            state.isChat= false
            state.isFConsultant= false
            state.isNews= true
            state.isProfile= false
        },
        toProfile(state){
            state.isNote = false
            state.isChat= false
            state.isFConsultant= false
            state.isNews= false
            state.isProfile= true
        },
        toLogout(state){
            state.isNote = false
            state.isChat= false
            state.isFConsultant= false
            state.isNews= false
            state.isProfile= false
        }


    },
    actions: {
    },
    modules: {
        main,
        auth
    }
})