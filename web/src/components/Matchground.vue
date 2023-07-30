<script setup>
import { useUserStore } from '@/stores/user';
import { usePkStore } from '../stores/pk';
import { ref } from 'vue';
import $ from 'jquery';

const store = useUserStore();
const storepk = usePkStore();

let match_btn_info = ref("开始匹配");
let bots = ref([]);
let select_bot = ref("-1");

const click_match_btn = () => {
    if (match_btn_info.value === "开始匹配") {
        match_btn_info.value = "取消";
        storepk.info.socket.send(JSON.stringify({
            event: "start-matching",
            bot_id: select_bot.value,
        }))
    }
    else {
        match_btn_info.value = "开始匹配";
        storepk.info.socket.send(JSON.stringify({
            event: "stop-matching",
        }))
    }
}

const refresh_bots = () => {
    $.ajax({
        type: "get",
        url: "http://localhost:3000/user/bot/getlist/",
        headers: {
            Authorization: "Bearer " + store.user.token
        },
        success(resp) {
            bots.value = resp;
        }
    });
}
refresh_bots();
</script>

<template>
    <div class="matchground">
        <div class="row">
            <div class="col-4">
                <div class="user-photo">
                    <img :src="store.user.photo" alt="">
                </div>
                <div class="user-username">
                    {{ store.user.username }}
                </div>
            </div>
            <div class="col-4">
                <div class="user-select-bot">
                    <select v-model="select_bot" class="form-select" aria-label="Default select example">
                        <option value="-1" selected>亲自出马</option>
                        <option v-for="bot in bots" :value="bot.id">{{ bot.title }}</option>
                    </select>
                </div>
            </div>
            <div class="col-4">
                <div class="user-photo">
                    <img :src="storepk.info.opponent_photo" alt="">
                </div>
                <div class="user-username">
                    {{ storepk.info.opponent_username }}
                </div>
            </div>
            <div class="col-12" style="text-align: center; padding-top: 15vh;">
                <button @click="click_match_btn" type="button" class="btn btn-warning btn-lg">{{ match_btn_info }}</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.matchground {
    width: 60vw;
    height: 70vh;
    margin: 40px auto;
    background-color: rgba(50, 50, 50, 0.5);
}

div.user-photo {
    margin-top: 10vh;
    text-align: center;
}

div.user-photo>img {
    width: 20vh;
    border-radius: 50%;
}

div.user-username {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    color: white;
    padding-top: 2vh;
}

div.user-select-bot {
    padding-top: 20vh;
}

div.user-select-bot>select {
    width: 60%;
    margin: 0 auto;
}
</style>
