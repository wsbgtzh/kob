<script setup>
import Playground from '../../components/Playground.vue';
import { onMounted, onUnmounted } from 'vue';
import { usePkStore } from '../../stores/pk';
import { useUserStore } from '../../stores/user';
import Matchground from '../../components/Matchground.vue';
import ResultBoard from '../../components/ResultBoard.vue';

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
            }, 200);
            storepk.info.gamemap = data.game.map;
            storepk.info.a_id = data.game.a_id;
            storepk.info.b_id = data.game.b_id;
            storepk.info.a_sx = data.game.a_sx;
            storepk.info.a_sy = data.game.a_sy;
            storepk.info.b_sx = data.game.b_sx;
            storepk.info.b_sy = data.game.b_sy;
        } else if (data.event === 'move') {
            const game = storepk.info.gameObject;
            const [snake0, snake1] = game.snakes;
            snake0.set_direction(data.a_direction);
            snake1.set_direction(data.b_direction);
        } else if (data.event === 'result') {
            const game = storepk.info.gameObject;
            const [snake0, snake1] = game.snakes;

            if (data.loser === 'all' || data.loser === 'A') {
                snake0.status = 'die';
            }
            if (data.loser === 'all' || data.loser === 'B') {
                snake1.status = 'die';
            }
            storepk.info.loser = data.loser;
        }
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
    <ResultBoard v-if="storepk.info.loser !== 'none'"></ResultBoard>
</template>

<style scoped> button {
     position: absolute;
     top: 10%;
     left: 25%;
 }
</style>