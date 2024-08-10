<script setup>
import { ref } from "vue"
import ChatBubble from '../components/ChatBubble.vue';
import ChatInput from '../components/ChatInput.vue';

const chats = ref([])

const pushMessage = (chat) =>{
    chats.value.push({
        string: chat.chat,
        isSelf: true
    })
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