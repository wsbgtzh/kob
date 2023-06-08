<script setup>
import ContentField from '../../../components/ContentField.vue';
import $ from 'jquery';
import { useUserStore } from '../../../stores/user';

const store = useUserStore();
// $.ajax({
//     type: "post",
//     url: "http://localhost:3000/user/bot/add/",
//     data: {
//         title: "Bot的标题",
//         description: "Bot的描述",
//         content: "Bot的代码",
//     },
//     headers: {
//         Authorization: "Bearer " + store.user.token,
//     },
//     success(resp) {
//         console.log(resp);
//     },
//     error(resp) {
//         console.log(resp);
//     }
// });

// $.ajax({
//     type: "post",
//     url: "http://localhost:3000/user/bot/remove/",
//     data: {
//         bot_id: 6,
//     },
//     headers: {
//         Authorization: "Bearer " + store.user.token,
//     },
//     success(resp) {
//         console.log(resp);
//     },
//     error(resp) {
//         console.log(resp);
//     }
// });

// $.ajax({
//     type: "post",
//     url: "http://localhost:3000/user/bot/update/",
//     data: {
//         bot_id: 3,
//         title: "Bot的标题3",
//         description: "Bot的描述3",
//         content: "Bot的代码3",
//     },
//     headers: {
//         Authorization: "Bearer " + store.user.token,
//     },
//     success(resp) {
//         console.log(resp);
//     },
//     error(resp) {
//         console.log(resp);
//     }
// });

$.ajax({
    type: "get",
    url: "http://localhost:3000/user/bot/getlist/",
    headers: {
        Authorization: "Bearer " + store.user.token,
    },
    success(resp) {
        console.log(resp);
    },
    error(resp) {
        console.log(resp);
    }
});

</script>

<template>
    <ContentField>我的Bot</ContentField>
</template>

<style scoped></style>