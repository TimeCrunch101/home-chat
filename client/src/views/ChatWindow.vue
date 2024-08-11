<script setup>
import { ref } from "vue"
import ChatBubble from '../components/ChatBubble.vue';
import ChatInput from '../components/ChatInput.vue';
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const sendMsg = (chat) => {
    socket.emit("send-msg", chat)
}

socket.on("server-send-msg", (data) => {
    chats.value.push({
        string: data,
        isSelf: false
    })
})

const chats = ref([])

const pushMessage = (chat) =>{
    chats.value.push({
        string: chat.chat,
        isSelf: true
    })
    sendMsg(chat.chat)
}



</script>

<template>
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