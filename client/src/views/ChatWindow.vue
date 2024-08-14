<script setup>
import { ref } from "vue"
import ChatBubble from '../components/ChatBubble.vue';
import ChatInput from '../components/ChatInput.vue';
import { io } from "socket.io-client";
import SetName from "../components/SetName.vue";

const socket = io("https://ws.cincitechlabs.com");
// const socket = io("http://localhost:3000");
const username = ref("Guest")
const chats = ref([])
const connectedRoom = ref("")
const room = ref({
    roomName: ""
})

socket.on("room-emit", (data) => {
    chats.value.push({
        string: data.msg,
        isSelf: false,
        username: data.username
    })
    sendNotification(data.username, data.msg)
})

const sendMsg = (chat) => {
    socket.emit("room-msg", {
        msg: chat,
        room: connectedRoom.value,
        username: username.value
    })
}

const pushMessage = (chat) =>{
    chats.value.push({
        string: chat.chat,
        isSelf: true,
        username: username.value
    })
    sendMsg(chat.chat)
}


const joinRoom = () => {
    connectedRoom.value = room.value.roomName
    socket.emit("join-room", room.value.roomName)
}

const setName = (name) => {
    username.value = name
}

const sendNotification = async (title, body) => {
    await window.versions.notify(title, body)
}

</script>

<template>
    <form @submit.prevent="joinRoom()">
        <input type="text" v-model="room.roomName">
        <button type="submit">Join room</button>
    </form>
    <SetName @save-name="setName"/>
    <div class="chats-container">
        <div v-for="data in chats">
            <ChatBubble :chatValue="data.string" :isSelf="data.isSelf" :username="data.username"/>
        </div>
    </div>
    <ChatInput @send-message="pushMessage"/>
</template>

<style scoped>
.chats-container {
    max-width: 70%;
    margin: auto;
    margin-bottom: 4em;
}

</style>