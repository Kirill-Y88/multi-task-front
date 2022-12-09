import { createStore } from 'vuex'
import main from '@/store/modules/main'
import auth from '@/store/modules/auth'
import note from '@/store/modules/note'

export default createStore({
    state: { /* для глобальных состояний */
        count: 0,

    },
    getters: {

    },
    mutations: { /* для глобальных мутаций */
        increment(state){
            state.count++;
        },



    },
    actions: {
    },
    modules: {
        main,
        auth,
        note
    }
})