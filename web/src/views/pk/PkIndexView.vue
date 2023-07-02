<script setup>
import Playground from '../../components/Playground.vue';
import { onMounted, onUnmounted } from 'vue';
import { usePkStore } from '../../stores/pk';
import { useUserStore } from '../../stores/user';
import Matchground from '../../components/Matchground.vue';

const store = useUserStore();
const storepk = usePkStore();
const socketUrl = `ws://localhost:3000/websocket/${store.user.token}/`;
let socket = null;

onMounted(() => {
    storepk.info.opponent_username = "我的对手";
    storepk.info.opponent_photo = "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png";
    socket = new WebSocket(socketUrl);

    socket.onopen = () => {
        console.log("connected!");
        storepk.info.socket = socket;
    }

    socket.onmessage = msg => {
        const data = JSON.parse(msg.data);
        if (data.event === "start-matching") {
            storepk.info.opponent_photo = data.opponent_photo;
            storepk.info.opponent_username = data.opponent_username;
            setTimeout(() => {
                storepk.info.status = "playing";
            }, 2000);
            storepk.info.gamemap = data.gamemap;
        }
        console.log(data);
    }

    socket.onclose = () => {
        console.log("disconnected!");
    }
});

onUnmounted(() => {
    socket.close();
    storepk.info.status = "matching";
})

</script>

<template>
    <Playground v-if="storepk.info.status === 'playing'"></Playground>
    <Matchground v-if="storepk.info.status === 'matching'"></Matchground>
</template>

<style scoped> button {
     position: absolute;
     top: 10%;
     left: 25%;
 }
</style>