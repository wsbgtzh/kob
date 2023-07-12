import { defineStore } from "pinia";
import { ref } from "vue";
import $ from 'jquery';

export const usePkStore = defineStore('pk', () => {
    const info = ref({
        status: "matching",
        socket: null,
        opponent_username: "",
        opponent_photo: "",
        gamemap: null,
        a_id: 0,
        a_sx: 0,
        a_sy: 0,
        b_id: 0,
        b_sx: 0,
        b_sy: 0,
        gameObject: null,
        loser: "none",
    });

    return { info }
})