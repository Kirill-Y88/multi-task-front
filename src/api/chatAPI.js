import axios from '@/api/axios'

const getAllUserChats = (currentUser) =>{
    console.log('chat user', currentUser.id)
    let config = {
        params: {
            userId: currentUser.id
        },
    }
    return axios.get('api/v1/messages/userChats', config)
}

const getAllMessagesChat = (currentUserId, anotherUserId) =>{
    let config = {
        params: {
            userIdThis: currentUserId,
            userIdThat: anotherUserId
        },
    }
    return axios.get('api/v1/messages/userChatMessages', config)
}

const getAllDontReadByUserChat = (currentUserId, anotherUserId) =>{
    let config = {
        params: {
            userIdThis: currentUserId,
            userIdThat: anotherUserId
        },
    }
    return axios.get('api/v1/messages/userChatDontReadMessages', config)
}

const updateMsgList = (msgList) => {
    console.log('msgList', msgList)
    return axios.post('/api/v1/messages/updateMsgList',msgList)
}

const getCountUserChats = (currentUser, count) =>{
    console.log('chat user', currentUser.id)
    console.log('count', count)
    let config = {
        params: {
            userToId: currentUser.id,
            count: count
        },
    }
    return axios.get('api/v1/messages/userTo', config)
}

const sendMsg = (msg) =>{
    return axios.post('/api/v1/messages/sendMsg',msg)
}

const readMsgList = (msgList) =>{
    return axios.post('/api/v1/messages/updateMsgList',msgList)
}

export default {
    getAllUserChats,
    sendMsg,
    updateMsgList,
    getCountUserChats,
    getAllMessagesChat,
    readMsgList,
    getAllDontReadByUserChat
}