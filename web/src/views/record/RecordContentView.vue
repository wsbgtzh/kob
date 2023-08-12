<script setup>
import Playground from '../../components/Playground.vue';
import { usePkStore } from '../../stores/pk';
import { useUserStore } from '../../stores/user';

const store = useUserStore();
const storepk = usePkStore();

</script>

<template>
    <Playground></Playground>
</template>

<style scoped></style>