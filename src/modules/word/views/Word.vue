<template>
    <div class="page-game">
        <div class="page-game__content">
            <p class="page-game__text">{{ countDown }} giây</p>
            <p class="page-game__text">{{ point }}</p>
            <div class="page-game__play">
                <p class="page-game__word">{{ textDefault }}</p>
                <div class="page-game__group">
                    <span class="text">{{ textLast }}&nbsp;</span>
                    <input v-model="textLinking" @keydown.enter="onEnterWord" />
                </div>
            </div>
            <Modal class="note-game" v-model:visible="isShowModalFail" centered :closable="false" :maskClosable="false">
                <p class="note-game__image">
                    <template v-if="countDown === 0">
                        <img src="../images/happy.png" />
                    </template>
                    <template v-else>
                        <img src="../images/sad.jpg" />
                    </template>
                </p>
                <p class="note-game__text">Bạn đã {{ countDown === 0 ? 'thắng' : 'thua' }}! <br /></p>
                <p class="note-game__point">{{ point }} điểm <br /></p>
                <div class="note-game__list flex">
                    <span class="text">Các từ đã nối:</span>
                    <div class="list-word">
                        <div class="list-word__item" v-for="(item, index) in listWord" :key="index">
                            {{ item }}
                        </div>
                    </div>
                </div>
                <br />
                <template #footer>
                    <button class="button" @click="onClose">Đóng</button>
                </template>
            </Modal>
            <Modal
                class="note-game noti-game__fail"
                v-model:visible="isShowModalFailWord"
                centered
                :closable="false"
                :maskClosable="false"
            >
                <p class="note-game__image"><img src="../images/sad.jpg" /></p>
                <p class="note-game__text">Bạn đã sai!</p>
                <template #footer>
                    <button class="button" @click="isShowModalFailWord = false">Đóng</button>
                </template>
            </Modal>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import jsonWords from '../composables/useWord';
import { Modal } from 'ant-design-vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Game',
    components: {
        Modal,
    },
    setup() {
        const router = useRouter();
        const textWord = ref<any>(jsonWords);
        const textDefault = ref<string>('');
        const textLinking = ref<string>('');
        const textLast = ref<string>('');
        const point = ref<number>(0);
        const failWord = ref<number>(0);
        const isShowModalFail = ref<boolean>(false);
        const isShowModalFailWord = ref<boolean>(false);
        const listWord = ref<any>([]);
        const countDown = ref<number>(60);

        const getRandomText = () => {
            const randomIndex = Math.floor(Math.random() * textWord.value.length);
            const item = textWord.value[randomIndex];
            const numberText = item.text.split(' ');
            if (numberText.length > 1) textDefault.value = item.text;
            else textDefault.value = 'á hậu';

            const arrayWord = textDefault.value.split(' ');
            const lengthWord = arrayWord.length;
            textLast.value = arrayWord[lengthWord - 1];
        };

        const onEnterWord = () => {
            if (textLinking.value) {
                const word = textLast.value + ' ' + textLinking.value;
                const object = textWord.value.filter((x: any) => x.text === word);
                if (object.length > 0) {
                    point.value++;
                    textDefault.value = object[0].text;
                    textLast.value = textDefault.value.split(' ')[1];
                    listWord.value.push(textDefault.value);
                } else {
                    if (point.value == 0) point.value = 0;
                    else point.value--;
                    failWord.value++;
                    isShowModalFailWord.value = true;
                }
                textLinking.value = '';
                countDown.value = 60;
            }
            return;
        };

        const onClose = () => {
            isShowModalFail.value = false;
            router.push({ name: 'Home' });
        };

        const countDownTimer = () => {
            if (countDown.value > 0) {
                setTimeout(() => {
                    countDown.value -= 1;
                    countDownTimer();
                }, 1000);
            } else isShowModalFail.value = true;
        };

        watch(
            () => failWord.value,
            (newVal: number) => {
                if (newVal === 3) isShowModalFail.value = true;
            },
        );

        onMounted(() => {
            getRandomText();
            countDownTimer();
        });

        return {
            textDefault,
            textLinking,
            textLast,
            point,
            textWord,
            failWord,
            isShowModalFail,
            isShowModalFailWord,
            listWord,
            onEnterWord,
            countDown,
            onClose,
            countDownTimer,
        };
    },
});
</script>

<style lang="scss" scoped>
.page-game {
    background-image: url('@/assets/images/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    color: #fff;
    &__content {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        max-width: 40%;
        width: 100%;
        margin-top: 50px;
    }
    &__text {
        font-size: 35px;
        margin-bottom: 10px;
    }
    &__play {
        margin-top: 150px;
    }
    &__word {
        font-size: 50px;
    }
    &__group {
        display: flex;
        align-items: center;
        justify-content: center;
        .text {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 5px;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            background-color: #e9ecef;
            border: 1px solid #ced4da;
            color: #000;
            font-size: 20px;
        }
        input {
            width: 100%;
            height: 40px;
            border: 1px solid #fff;
            border-radius: 4px;
            padding: 0 5px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            color: #000;
            outline: none;
            font-size: 20px;
        }
    }
}
.note-game {
    .ant-modal-body {
        .note-game {
            &__text {
                font-size: 30px;
                margin-bottom: 10px;
                text-align: center;
                font-weight: 500;
            }
            &__point {
                font-size: 20px;
                text-align: center;
            }
            &__list {
                margin-left: 20%;
                .text {
                    font-size: 20px;
                }
                .list-word {
                    margin-left: 10px;
                    font-size: 20px;
                }
            }
            &__image {
                text-align: center;
                img {
                    width: 100px;
                }
            }
        }
    }
    .ant-modal-footer {
        text-align: center;
        .button {
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
}
</style>
