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

    selectChat: null,

    sessionSeconds:0,
    survey: null,
    isFindUser: true,

    countDontReadMessages: 0


}

const actions = {

    getAllUserChats(context, currentUser) {
        return new Promise( () => {
            chatAPI.getAllUserChats(currentUser)
                .then(response =>{
              //      console.log('resp ONE!',response)
                    context.commit('addChats', response)
                }).then(
                () => {
                 //   console.log('downloadAllChatMsg')
                    context.dispatch('downloadAllChatMsg',currentUser)
                })
                .catch(result => {
                    console.log('result errors', result)
                })
        })
    },

    updateAllUserChats(context, currentUser){
        return new Promise( () => {
            chatAPI.getAllUserChats(currentUser)
                .then(response =>{
                    //      console.log('resp ONE!',response)
                    context.commit('addChats', response)
                }).then(
                () => {
                //    console.log('updateAllChatMsg')
                    context.dispatch('updateAllChatMsg',currentUser)
                })
                .catch(result => {
                    console.log('result errors', result)
                })
        })
    },

    downloadAllChatMsg(context, currentUser){
        for (let i = 0; i < context.state.allChats.length; i++) {
            let dataUser = {
                index: i,
                currentUserId: currentUser.id,
                anotherUserId: context.state.allChats[i].userId
            }
            //console.log('downloadAllChatMsg 3 ')
            new Promise(  () => {
                context.dispatch('getChatMessages2', dataUser)
            })
        }
    },

    updateAllChatMsg(context, currentUser){
        for (let i = 0; i < context.state.allChats.length; i++) {
            let dataUser = {
                index: i,
                currentUserId: currentUser.id,
                anotherUserId: context.state.allChats[i].userId
            }
            console.log('updateAllChatMsg ')
            new Promise(  () => {
                context.dispatch('getChatDontReadMessages2', dataUser)
            }).then(response =>{
                console.log('resp updateAllChatMsg',response)
            })
        }
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
                  //  console.log('resp getChatMessages',response)
                    context.commit('addChatMessages2', { index:dataUser.index, response: response})
                })
                .catch(result => {
                    console.log('result errors', result)
                })
        })
    },

    getChatDontReadMessages2(context, dataUser){
        return new Promise( () => {
            chatAPI.getAllDontReadByUserChat(dataUser.currentUserId, dataUser.anotherUserId)
                .then(response =>{
                       //      console.log('resp getAllDontReadByUserChat',response)
                    context.commit('addDontReadChatMessages', { index:dataUser.index, response: response})
                   // console.log('result getChatDontReadMessages2', response)
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
                    context.commit('addMessageForSelectChat', response.data)
                  //  console.log('resp sendMsg',response)
                })
        })
    },

    readMsgInSelectedChat(context, chat){
        console.log('readMsgInSelectedChat context',chat)
        let readMessages = []
        for (let i = 0; i < chat.messages.length; i++) {
            if( chat.messages[i].userToId === this.state.auth.currentUser.id && chat.messages[i].read === false){
                readMessages.push(chat.messages[i])
            }
        }
        context.commit('changeSelectedChat', chat)
        context.commit('readMessages', readMessages)
        return new Promise( () => {
            chatAPI.updateMsgList(readMessages)
        }).then(response => {
            console.log('resp readMsgInSelectedChat',response)
        })
    },


    startSurvey(context, currentUser){
        context.state.survey = setInterval(
            () => {
                context.dispatch('updateAllUserChats', currentUser)
            }
            , 2000)
    },

    stopSurvey(context){
        context.commit('stopSurvey')
    },

    findUserToChat(context, userLogin){
        console.log('findUserToChat userLogin',userLogin)
        return new Promise( () => {
            chatAPI.findUser(userLogin)
                .then(response => {
                    console.log('findUserToChat response',response.data )
                    context.commit('addUserToChat', response.data)
                    context.commit('finedUser')
                    //  console.log('resp sendMsg',response)
                })
                .catch(result => {
                console.log('result errors', result)
                    console.log('result errors response', result.response.data.message)
                    context.commit('dontFinedUser')
            })
        })

    }


}

const mutations = {

    changeSelectedChat(state, chat){
        state.selectChat = chat
      //  let pastChatDontRead = state.selectChat.chatDontRead
      //  state.countDontReadMessages = state.countDontReadMessages-pastChatDontRead
        state.selectChat.chatDontRead = 0;
        for (let i = 0; i < state.selectChat.messages.length; i++) {
            if(chat.messages[i].userToId === this.state.auth.currentUser.id)
            state.selectChat.messages[i].downloaded = true
            state.selectChat.messages[i].read = true
        }
    },
    
    clearSelectChat(state){
      state.selectChat = null
    },

    chatListClear(state) {
        state.allChats = [];
    },

    addChats(state, payload) {
        let i
        let downloadChats = payload.data
        let tempChats ={}

        if(state.allChats.length===0) {
            for (i = 0; i < downloadChats.length; i++) {
                tempChats = {
                    userId: downloadChats[i].userId,
                    userLogin: downloadChats[i].userLogin,
                    chatDontDownload: 0,
                    chatDontRead: 0,
                    messages: []
                }
                state.allChats.push(tempChats)
            }
        }else {
            for (i = 0; i < downloadChats.length; i++) {
                tempChats = {
                    userId: downloadChats[i].userId,
                    userLogin: downloadChats[i].userLogin,
                    chatDontDownload: 0,
                    chatDontRead: 0,
                    messages: []
                }
                let find = false
                for (let j = 0; j < state.allChats.length; j++) {
                    if(state.allChats[j].userId===tempChats.userId){
                        find = true
                        return
                    }
                }
                if(find ===false){
                    state.allChats.push(tempChats)
                }
            }
        }
       // state.allChats = payload.data
    },

    addUserToChat(state, user){
        let tempChats = {
            userId: user.id,
            userLogin: user.login,
            chatDontDownload: 0,
            chatDontRead: 0,
            messages: []
        }
        let find = false
        for (let i = 0; i < state.allChats.length; i++) {
            if(tempChats.userId === state.allChats[i].userId){
                find = true
                break
            }
        }

        if(find === false){
            state.allChats.push(tempChats)
        }

    },

    addMessageForSelectChat(state, payload){
        state.selectChat.messages.push(payload)
    },

    addChatMessages(state, payload){
        state.selectChat.messages = payload.data
    },

    addChatMessages2(state, payload){
        state.allChats[payload.index].messages = payload.response.data
        let countDontRead = 0
            for (let j = 0; j < state.allChats[payload.index].messages.length; j++) {
              if ( state.allChats[payload.index].messages[j].userToId === this.state.auth.currentUser.id &&  state.allChats[payload.index].messages[j].read === false) {
                countDontRead++
                 // console.log('countDontRead++', countDontRead)
              }
            }
        state.allChats[payload.index].chatDontRead = countDontRead
       // state.countDontReadMessages = state.countDontReadMessages + countDontRead
    },

    addDontReadChatMessages(state, payload){
      //  state.allChats[payload.index].messages.push(payload.response.data)
        for (let i = 0; i < payload.response.data.length; i++) {
           // state.allChats[payload.index].messages.push(payload.response.data[i])
            let temp = payload.response.data[i]
            let find = false

            for (let j = 0; j < state.allChats[payload.index].messages.length; j++) {
                if(state.allChats[payload.index].messages[j].id === temp.id){
                    find = true
                    break
                }
            }
            if(find === false){
                state.allChats[payload.index].messages.push(temp)
            }

        }


        let countDontRead = 0
        for (let j = 0; j < state.allChats[payload.index].messages.length; j++) {
            if ( state.allChats[payload.index].messages[j].userToId === this.state.auth.currentUser.id &&  state.allChats[payload.index].messages[j].read === false) {
                countDontRead++
                // console.log('countDontRead++', countDontRead)
            }
        }
        state.allChats[payload.index].chatDontRead = countDontRead
       // state.countDontReadMessages = state.countDontReadMessages + countDontRead
    },

    addSurvey(state, numberSurvey){
        state.survey = numberSurvey
    },

    stopSurvey(state){
        clearInterval(state.survey)
    },

    finedUser(state){
        state.isFindUser = true
    },

    dontFinedUser(state){
        state.isFindUser = false
    }

}

const getters = {
    getCountDontReadMessages: state => {
        let temp = 0
        for (let i = 0; i < state.allChats.length; i++) {
            temp = temp + state.allChats[i].chatDontRead
        }
        return temp
    }
}






export default {
    state,
    actions,
    mutations,
    getters
}