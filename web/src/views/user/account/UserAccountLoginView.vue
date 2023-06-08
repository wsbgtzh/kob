<script setup>
import ContentField from '../../../components/ContentField.vue';
import { useUserStore } from '../../../stores/user';
import { ref } from 'vue';
import router from '../../../router';
let username = ref('');
let password = ref('');
let error_message = ref('');
const store = useUserStore();

const jwt_token = localStorage.getItem("jwt_token");
if (jwt_token) {
    store.user.token = jwt_token;
    store.getinfo({
        success() {
            router.push({ name: "home" });
            store.user.pulling_info = false;
        },
        error() {
            store.user.pulling_info = false;
        }
    })
} else {
    store.user.pulling_info = false;
}
const login = () => {
    error_message.value = '';
    store.login({
        username: username.value,
        password: password.value,
        success() {
            store.getinfo({
                success(resp) {
                    router.push({ name: 'home' });
                },
            })
        },
        error() {
            error_message.value = "用户名或密码错误";
        }
    })
}
</script>

<template>
    <ContentField v-if="!store.user.pulling_info">
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
                    </div>
                    <button type="submit" class="btn btn-primary">登录</button>
                    <div class="error-message">{{ error_message }}</div>
                </form>
            </div>
        </div>
    </ContentField>
</template>

<style scoped>
button {
    width: 100%;
}

.error-message {
    color: red;
}
</style>