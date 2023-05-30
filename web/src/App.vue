<script setup>
import NavBar from './components/NavBar.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import { nextTick, provide, ref } from 'vue'
const isRouter = ref(true)
const reload = () => {
  isRouter.value = false
  nextTick(() => {
    isRouter.value = true
  })
}
provide("reload", reload);
</script>

<template>
  <NavBar></NavBar>
  <RouterView v-if="isRouter" />
</template>

<style>
body {
  background-image: url('@/assets/images/background.png');
  background-size: cover;
}
</style>