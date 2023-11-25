import { createRouter, createWebHistory, RouteParams } from 'vue-router';
import { useRoute } from '@/composables/useRoute';
import { AppRouteNames } from '@/types/router-name';

const { routes } = useRoute();

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export function routerPush(name: AppRouteNames, params?: RouteParams): ReturnType<typeof router.push> {
    if (params !== undefined) {
        return router.push({
            name,
            params,
        });
    } else {
        return router.push({ name });
    }
}

export { router };
