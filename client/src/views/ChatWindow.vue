<script setup>
import { ref } from "vue"
import ChatBubble from '../components/ChatBubble.vue';
import ChatInput from '../components/ChatInput.vue';
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
const chats = ref([])
const connectedRoom = ref("")
const room = ref({
    roomName: ""
})

socket.on("room-emit", (data) => {
    chats.value.push({
        string: data,
        isSelf: false
    })
})

const sendMsg = (chat) => {
    socket.emit("room-msg", {
        msg: chat,
        room: connectedRoom.value
    })
}

const pushMessage = (chat) =>{
    chats.value.push({
        string: chat.chat,
        isSelf: true
    })
    sendMsg(chat.chat)
}


const joinRoom = () => {
    console.log("Join Room: ",room.value.roomName)
    connectedRoom.value = room.value.roomName
    socket.emit("join-room", room.value.roomName)
}

</script>

<template>
    <form @submit.prevent="joinRoom()">
        <input type="text" v-model="room.roomName">
        <button type="submit">Join room</button>
    </form>
    <div class="chats-container">
        <div v-for="data in chats">
            <ChatBubble :chatValue="data.string" :isSelf="data.isSelf"/>
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