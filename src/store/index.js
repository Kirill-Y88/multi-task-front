import { createStore } from 'vuex'
import main from '@/store/modules/main'

export default createStore({
    state: { /* для глобальных состояний */
        count: 0,
    },
    getters: {
    },
    mutations: { /* для глобальных мутаций */
        increment(state){
            state.count++;
        }


    },
    actions: {
    },
    modules: {
        main
    }
})