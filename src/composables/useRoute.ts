import { RouteRecordRaw } from 'vue-router';

let routes: Array<RouteRecordRaw> = [];

export const useRoute = () => {
    const importRoute = require.context('@/modules', true, /router+\.ts$/i);
    importRoute.keys().forEach((filename: string) => {
        if (filename === './router.js') return;
        const route = importRoute(filename).default || {};
        routes = [...routes, ...route];
    });

    return { routes };
};
