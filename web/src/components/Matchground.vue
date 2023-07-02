<script setup>
import { useUserStore } from '@/stores/user';
import { usePkStore } from '../stores/pk';
import { ref } from 'vue';

const store = useUserStore();
const storepk = usePkStore();

let match_btn_info = ref("开始匹配");

const click_match_btn = () => {
    if (match_btn_info.value === "开始匹配") {
        match_btn_info.value = "取消";
        storepk.info.socket.send(JSON.stringify({
            event: "start-matching",
        }))
    }
    else {
        match_btn_info.value = "开始匹配";
        storepk.info.socket.send(JSON.stringify({
            event: "stop-matching",
        }))
    }
}
</script>

<template>
    <div class="matchground">
        <div class="row">
            <div class="col-6">
                <div class="user-photo">
                    <img :src="store.user.photo" alt="">
                </div>
                <div class="user-username">
                    {{ store.user.username }}
                </div>
            </div>
            <div class="col-6">
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
</style>
