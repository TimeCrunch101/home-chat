<script setup>
import {ref} from 'vue'
import {useRouter} from "vue-router"
const router = useRouter()

const myName = ref("")

router.push('/')

const pickName = () => {
    console.log(myName.value)

}

</script>

<template>
    <form @submit.prevent="pickName()">
        <label>Pick Name: </label>
        <input type="text" v-model="myName">
        <button type="submit">Save</button>
    </form>
    <RouterView />
</template>

<style scoped>

</style>
