<template>
    <div class="home-page">
        <div class="home-page__content">
            <p class="home-page__text">Tên người chơi</p>
            <div class="home-page__group">
                <div class="home-page__input">
                    <input v-model="nameUser" type="text" />
                    <span v-if="showError" class="error">Vui lòng nhập tên!</span>
                </div>
                <button class="home-page__button" @click="onEnter">Nhập</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Home',
    setup() {
        const router = useRouter();
        const nameUser = ref<string>('');
        const showError = ref<boolean>(false);

        const onEnter = () => {
            if (!nameUser.value) {
                showError.value = true;
                return;
            } else {
                showError.value = false;
                router.push({ name: 'Word' });
            }
        };

        return {
            nameUser,
            showError,
            onEnter,
        };
    },
});
</script>

<style lang="scss" scoped>
.home-page {
    background-image: url('@/assets/images/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: relative;
    color: #fff;
    &__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 40%;
        width: 100%;
    }
    &__text {
        font-size: 30px;
    }
    &__group {
        display: flex;
        flex-direction: row;
    }
    &__input {
        width: calc(100% - 80px);
        height: 36px;
        input {
            width: 100%;
            height: 36px;
            border: 1px solid #fff;
            border-radius: 4px;
            padding: 0 5px;
            outline: none;
            color: #000;
        }
        .error {
            color: red;
            margin-top: 5px;
            display: block;
        }
    }
    &__button {
        width: 70px;
        border-radius: 4px;
        border: none;
        background: #40a9ff;
        color: #fff;
        font-size: 20px;
        padding: 8px 5px;
        line-height: 20px;
        margin-left: 10px;
        cursor: pointer;
    }
}
</style>
