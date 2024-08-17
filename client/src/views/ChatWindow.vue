<script setup>
import { ref } from "vue"
import ChatBubble from '../components/ChatBubble.vue';
import ChatInput from '../components/ChatInput.vue';
import socket from "../assets/socket"
import SetName from "../components/SetName.vue";

const username = ref("Guest")
const users = ref([])
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
    window.scrollTo(0, document.body.scrollHeight + 50)
})

const sendMsg = (chat) => {
    socket.emit("room-msg", {
        msg: chat,
        room: connectedRoom.value,
        username: username.value
    })
    window.scrollTo(0, document.body.scrollHeight + 50)
}

const pushMessage = (chat) => {
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
    socket.auth = { name }
    socket.connect()
    username.value = name
}

const sendNotification = async (title, body) => {
    await window.versions.notify(title, body)
}

// TODO: Do better error handling
socket.on("connect_error", (err) => {
    if (err.message === "Invalid Username") {
        // this.usernameAlreadySelected = false
        console.error(err)
    }
})


socket.on("users", (userJoinEvent) => {
    userJoinEvent.forEach((user) => {
        user.self = user.userID === socket.id;
        users.value.push(user);
    });
});

socket.on("user connected", (user) => {
    users.value.push(user)
})

</script>

<template>
    <form v-if="username !== 'Guest'" @submit.prevent="joinRoom()">
        <input type="text" v-model="room.roomName">
        <button type="submit">Join room</button>
    </form>
    <SetName @save-name="setName" />
    <div>
        <p v-for="user in users">{{ user.username }}</p>
    </div>
    <div class="chats-container">
        <div v-for="data in chats">
            <ChatBubble :chatValue="data.string" :isSelf="data.isSelf" :username="data.username" />
        </div>
    </div>
    <div>
        <ChatInput v-if="username !== 'Guest'" @send-message="pushMessage" />
    </div>
</template>

<style scoped>
.chats-container {
    max-width: 70%;
    margin: auto;
    margin-bottom: 10em;
}
</style>