import axios from 'axios';
import Cookies from 'js-cookie';
// import cloneDeep from 'lodash.clonedeep';

// 請求
export const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
});

const requestBeforeSend = (config: any) => {
  config.params = {
    ...config.params,
  };
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${Cookies.get('token')}`,
  };

  return config;
};

const requestBeforeResponse = (response: any) => {
  try {
    const { data } = response.data;
    return data?.data || data;
  } catch (err) {
    console.log(err, 'err?');
    return err;
  }
};

[request].forEach((req) => {
  req.interceptors.request.use(requestBeforeSend, (err) => Promise.reject(err));
  req.interceptors.response.use(requestBeforeResponse, async (err) => {
    return Promise.reject(err);
  });
});
