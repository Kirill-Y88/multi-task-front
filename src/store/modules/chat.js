import chatAPI from "@/api/chatAPI";

const state = {

    allChats: [{}],

    selectChat: {},
    selectUserIdName: 'Kirill',

}

const actions = {

    getAllUserChats(context, user) {
        return new Promise( () => {
            chatAPI.getAllUserChats(user)
                .then(response =>{
                    console.log('resp',response)
                    context.commit('addChats', response)
                })
                .catch(result => {
                    console.log('result errors', result)
                })
        })
    },

    getChatMessages(context, dataUser){
        return new Promise( () => {
            chatAPI.getAllMessagesChat(dataUser.currentUserId, dataUser.anotherUserId)
                .then(response =>{
                    console.log('resp getChatMessages',response)
                    context.commit('addChatMessages', response)
                })
                .catch(result => {
                    console.log('result errors', result)
                })
        })
    }


}

const mutations = {
    sendMsg(state, msg) {
        state.allParticipants.find(state.allParticipants.userIdFrom === msg.userIdFrom).messages = msg.msg
        state.allParticipants.find(state.allParticipants.userIdFrom === msg.userIdFrom).userIdFrom = msg.useFromId
    },

    addMsg(state, payload) {
        let i
        for (i = 0; i < payload.length; i++) {
            state.incomingMsg.push({
                id: payload[i].id,
                userFromId: payload[i].userIdFrom,
                msg: payload[i].msg,
                dateTime: payload[i].createdAt
            })
        }
    },

    changeSelectedChat(state, chat){
        state.selectChat = chat
    },

    chatListClear(state) {
        state.allChats = [{}];
    },

    addChats(state, payload) {
        // let i, j
        // let downloadChats = payload.data
        // let tempChats =[]
        // for (i = 0; i < downloadChats.length; i++) {
        //     for (j = 0; j < state.allChats.length; j++) {
        //         if (state.allChats[j].userIdFrom === downloadChats[i].userId) {
        //             return
        //         } else {
        //             tempChats.push({
        //                 userIdFrom: downloadChats[i].userId,
        //                 userLoginFrom: downloadChats[i].userLogin,
        //             })
        //         }
        //     }
        // }
        // state.allChats.concat(tempChats)
        // for (let k = 0; k < tempChats.length; k++) {
        //     state.allChats.push(tempChats[k])
        // }

        state.allChats = payload.data

    },

    addChatMessages(state, payload){
        console.log('getChatMessages state',state)
        console.log('getChatMessages payload',payload)
        state.selectChat.messages = payload.data
    }

}






export default {
    state,
    actions,
    mutations
}