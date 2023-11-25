<template>
    <div class="layout-app">
        <div class="main all-center h-full">
            <transition-router-view />
        </div>
    </div>
</template>

<script lang="ts">
import TransitionRouterView from '@/components/TransitionRouterView.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LayoutApp',
    components: {
        TransitionRouterView,
    },
});
</script>

<style lang="scss">
body {
    margin: 0;
}
.layout-app {
    height: 100%;
    overflow: hidden;
    .main {
        height: inherit;
    }
}
</style>
