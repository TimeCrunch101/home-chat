<script setup>
import {useRouter} from "vue-router"
const router = useRouter()

router.push('/')

</script>

<template>
    <p>Version: 0.1.9</p>
    <RouterView />
</template>
