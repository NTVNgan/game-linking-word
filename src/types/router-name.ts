export type AppRouteNames = 'Error' | 'Error404';

export interface RouterLink {
    label: string;
    name: string;
    icon?: string;
    permissions?: string[];
}
