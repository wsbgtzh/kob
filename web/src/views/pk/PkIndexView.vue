<script setup>
import Playground from '../../components/Playground.vue';
import { inject } from 'vue'
const reload = inject("reload")
</script>

<template>
    <Playground></Playground>
    <button @click="reload" type="button" class="btn btn-primary">刷新地图</button>
</template>

<style scoped>
button {
    position: absolute;
    top: 10%;
    left: 25%;
}
</style>