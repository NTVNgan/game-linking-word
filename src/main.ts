/* eslint-disable @typescript-eslint/no-var-requires */
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { store } from './store';
import './assets/styles/main.scss';
import 'ant-design-vue/dist/antd.css';
import mitt from 'mitt';

const app = createApp(App);

const emitter = mitt();

app.provide('emitter', emitter);

app.use(store).use(router).mount('#app');
