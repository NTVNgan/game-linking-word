<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    components: {
        LayoutApp: defineAsyncComponent(() => import('./layouts/LayoutApp.vue')),
    },
    setup() {
        const route = useRoute();
        const defaultLayout = 'LayoutApp';

        const layout = computed(() => route.meta.layout || defaultLayout);

        return { layout };
    },
});
</script>

<style lang="scss">
#app {
    height: 100vh;
}
</style>
