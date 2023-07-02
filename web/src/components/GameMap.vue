<script setup>
import { GameMap } from '@/assets/scripts/GameMap'
import { ref, onMounted } from 'vue'
import { usePkStore } from '../stores/pk';
let parent = ref(null)
let canvas = ref(null)
const store = usePkStore();
onMounted(() => {
    new GameMap(canvas.value.getContext('2d'), parent.value, store)
}) 
</script>

<template>
    <div ref="parent" class="gamemap">
        <canvas ref="canvas" tabindex="0"></canvas>
    </div>
</template>


<style scoped>
div.gamemap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>