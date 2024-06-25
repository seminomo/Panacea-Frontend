import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
const cookieStore = cookies();
const token = cookieStore.get('token')?.value;

interface ApiResponse<T = any> {
  data: T;
}

// 請求
export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
});

const requestBeforeSend = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.params = {
    ...config.params,
  };
  const headers = new AxiosHeaders(config.headers);
  headers.set('Authorization', `Bearer ${token}`);
  config.headers = headers;

  return config;
};

const requestBeforeResponse = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  try {
    const { data } = response.data;
    return data;
  } catch (err) {
    console.log(err, 'err?');
    throw err;
  }
};

// Apply the interceptors
request.interceptors.request.use(requestBeforeSend, (err) => Promise.reject(err));
request.interceptors.response.use(
  (response) => requestBeforeResponse(response),
  async (err) => {
    return Promise.reject(err);
  },
);
