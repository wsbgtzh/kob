<script setup>
import { usePkStore } from '../stores/pk';
import { useUserStore } from '../stores/user';
const storepk = usePkStore();
const storeuser = useUserStore();

const restart = () => {
    storepk.info.status = "matching";
    storepk.info.loser = "none";
    storepk.info.opponent_username = "我的对手";
    storepk.info.opponent_photo = "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png";
}
</script>

<template>
    <div class="result-board">
        <div class="result-board-text" v-if="storepk.info.loser === 'all'">
            Draw
        </div>
        <div class="result-board-text" v-else-if="storepk.info.loser === 'A' && storepk.info.a_id == storeuser.user.id">
            Lose
        </div>
        <div class="result-board-text" v-else-if="storepk.info.loser === 'B' && storepk.info.b_id == storeuser.user.id">
            Lose
        </div>
        <div class="result-board-text" v-else>
            Win
        </div>
        <div class="result-board-btn">
            <button @click="restart" type="button" class="btn btn-warning btn-lg">重新匹配</button>
        </div>
    </div>
</template>

<style scoped>
div.result-board {
    width: 30vw;
    height: 40vh;
    background-color: rgba(50, 50, 50, 0.5);
    position: absolute;
    top: 30vh;
    left: 35vw;
}

div.result-board-text {
    text-align: center;
    color: white;
    font-size: 50px;
    font-weight: 600;
    font-style: italic;
    padding-top: 5vh;
}

div.result-board-btn {
    text-align: center;
    padding-top: 10vh;
}
</style>