import axios, { AxiosResponse } from 'axios';

export type ClientResponse = AxiosResponse;

export const client = axios.create({
    // https://axios-http.com/docs/req_config
    timeout: 20 * 1000,
});
