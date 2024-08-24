<script setup>

const props = defineProps({
    username: String,

})



</script>
<template>


<div class="online-users">
    <ul class="users-list">
        <li class="user">{{ props.username }}</li>
    </ul>
</div>


</template>
<style>

.online-users {
    margin-left: 1em;
    width: max-content;
    padding-right: 1em;
}

li::marker {
    color: green;
}

</style>