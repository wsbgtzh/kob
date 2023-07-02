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
    })

    return { info }
})