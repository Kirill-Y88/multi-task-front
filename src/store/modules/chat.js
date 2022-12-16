import chatAPI from "@/api/chatAPI";

const state = {

    allChats: [
    //    {
        // userId:'',
        // userLogin:'',
        // chatDontDownload:'',
        // chatDontRead:'',
        // messages: [{
        //     id:'',
        //     userFromId:'',
        //     userToId:'',
        //     msg:'',
        //     createdAt:'',
        //     download:'',
        //     read:''
        //     }]
     //   }
    ],

    selectChat: {},
   // selectUserIdName: 'Kirill',

}

const actions = {

    downloadAllChatMsg(context, currentUser){
        //console.log('context ', context)
        for (let i = 0; i < context.state.allChats.length; i++) {
            let dataUser = {
                index: i,
                currentUserId: currentUser.id,
                anotherUserId: context.state.allChats[i].userId
            }
            //console.log('downloadAllChatMsg 3 ')
            new Promise(  () => {
                //console.log('dataUser ', dataUser)
                //console.log('context.state.allChats[i] ', context.state.allChats[i])
                //console.log('selectChat 1 ', context.state.selectChat)
               // context.state.selectChat = context.state.allChats[i]
            //    console.log('selectChat 2 ', context.state.selectChat)
            //    console.log('WTF  dispatch getChatMessages')
                context.dispatch('getChatMessages2', dataUser)
            })
        }
    },

    GAUC(  context, currentUser  ){
        context.commit('addChats',  chatAPI.getAllUserChats(currentUser) )


    },
    getAllUserChats(context, currentUser) {

        return new Promise( () => {
            chatAPI.getAllUserChats(currentUser)
                .then(response =>{
              //      console.log('resp ONE!',response)
                    context.commit('addChats', response)
                }).then(
                () => {
                    console.log('downloadAllChatMsg')
                    context.dispatch('downloadAllChatMsg',currentUser)
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
                   // console.log('resp getChatMessages',response)
                    context.commit('addChatMessages', response)
                })
                .catch(result => {
                    console.log('result errors', result)
                })
        })
    },

    getChatMessages2(context, dataUser){
        return new Promise( () => {
            chatAPI.getAllMessagesChat(dataUser.currentUserId, dataUser.anotherUserId)
                .then(response =>{
           //         console.log('resp getChatMessages',response)
                    context.commit('addChatMessages2', { index:dataUser.index, response: response})
                })
                .catch(result => {
                    console.log('result errors', result)
                })
        })
    },

    sendMsg(context, msg){
        return new Promise( () => {
            chatAPI.sendMsg(msg)
                .then(response => {
                    console.log('resp sendMsg',response)
                })
        })

    }


}

const mutations = {

    changeSelectedChat(state, chat){
        state.selectChat = chat
        state.selectChat.chatDontRead = 0;
    },

    chatListClear(state) {
        state.allChats = [];
    },

    addChats(state, payload) {
        let i
        let downloadChats = payload.data
        let tempChats ={}
        for (i = 0; i < downloadChats.length; i++) {
            tempChats = {
                userId:downloadChats[i].userId,
                userLogin:downloadChats[i].userLogin,
                chatDontDownload:0,
                chatDontRead:0,
                messages: []
            }
            state.allChats.push(tempChats)
        }



       // state.allChats = payload.data



    },

    addChatMessages(state, payload){
        //console.log('getChatMessages state',state)
        console.log('getChatMessages payload',payload)
        state.selectChat.messages = payload.data
    },

    addChatMessages2(state, payload){
        //console.log('getChatMessages state',state)
        console.log('getChatMessages2 payload',payload)
        state.allChats[payload.index].messages = payload.response.data
    //    state.selectChat.messages = payload.data

        let countDontRead = 0
            for (let j = 0; j < state.allChats[payload.index].messages.length; j++) {
              if (state.allChats[payload.index].messages[j].read === false) {
                countDontRead++
                  console.log('countDontRead++', countDontRead)
              }
            }
        state.allChats[payload.index].chatDontRead = countDontRead


    }

}






export default {
    state,
    actions,
    mutations
}