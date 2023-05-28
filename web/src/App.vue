<script setup>
import axios from 'axios'
import { ref } from 'vue'
const bot_name = ref('')
const bot_rating = ref('')
axios({
  url: 'http://localhost:3000/pk/getbotinfo/',
  method: 'get',
}).then((resp) => {
  bot_name.value = resp.data.name
  bot_rating.value = resp.data.rating
})
</script>

<template>
  <div>Bot昵称:{{ bot_name }}</div>
  <div>Bot战力:{{ bot_rating }}</div>
  <RouterView />
</template>

<style>
body {
  background-image: url("@/assets/background.png");
  background-size: cover;
}
</style>