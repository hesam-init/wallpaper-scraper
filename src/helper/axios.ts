import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ENV } from "$/src/constants/env.ts";

const http: AxiosInstance = axios.create({
	baseURL: ENV.BASE_URL,
	timeout: 8000,
});

http.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

http.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default http;
