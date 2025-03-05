import RequestHeader from "@/components/request-header";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const { environment, prod, dev, key } = RequestHeader(null);
const baseURL = environment === "development" ? dev : prod;
const defaultConfig = {
    headers: { "krishnam-auth": key, "Authorization": `Bearer ${key}` }
};

const ApiService = {
    async get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
        try {
            const mergedConfig = Object.assign({}, defaultConfig, config);
            const response: AxiosResponse<T> = await axios.get(`${baseURL}${url}`, mergedConfig);
            return response.data;
        } catch (error: any) {
            console.error('API GET error:', error);
            throw error;
        }
    },

    async post<T, U>(url: string, data: U, config: AxiosRequestConfig = {}): Promise<T> {
        try {
            const mergedConfig = Object.assign({}, defaultConfig, config);
            const response: AxiosResponse<T> = await axios.post(`${baseURL}${url}`, data, mergedConfig);
            return response.data;
        } catch (error: any) {
            console.error('API POST error:', error);
            throw error;
        }
    },

    async put<T, U>(url: string, data: U, config: AxiosRequestConfig = {}): Promise<T> {
        try {
            const mergedConfig = Object.assign({}, defaultConfig, config);
            const response: AxiosResponse<T> = await axios.put(`${baseURL}${url}`, data, mergedConfig);
            return response.data;
        } catch (error: any) {
            console.error('API PUT error:', error);
            throw error;
        }
    },

    async delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
        try {
            const mergedConfig = Object.assign({}, defaultConfig, config);
            const response: AxiosResponse<T> = await axios.delete(`${baseURL}${url}`, mergedConfig);
            return response.data;
        } catch (error: any) {
            console.error('API DELETE error:', error);
            throw error;
        }
    },
};

export default ApiService;