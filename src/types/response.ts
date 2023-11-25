declare interface Res<T> {
    error: string;
    data?: T;
    message?: string[];
}
