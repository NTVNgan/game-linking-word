import { default as instance } from 'axios';

const AxiosConfig = {
    baseURL: process.env.VUE_APP_ROOT_API,
    timeout: 60 * 1000,
    validateStatus: function (status: number) {
        return status >= 200 && status <= 500;
    },
};

const axios = instance.create(AxiosConfig);

export { axios };
