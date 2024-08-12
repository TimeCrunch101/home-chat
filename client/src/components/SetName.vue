<script setup>
import { ref } from "vue"
const username = ref('')

const emit = defineEmits(["save-name"])

const setName = () => {
    emit('save-name', username.value)
}

</script>

<template>

<form @submit.prevent="setName()">
    <label>Set Name</label>
    <input type="text" v-model="username">
    <button type="submit">Save</button>
</form>

</template>