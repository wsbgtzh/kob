<script setup>
import NavBar from './components/NavBar.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
</script>

<template>
  <NavBar></NavBar>
  <RouterView />
</template>

<style>
body {
  background-image: url('@/assets/images/background.png');
  background-size: cover;
}
</style>