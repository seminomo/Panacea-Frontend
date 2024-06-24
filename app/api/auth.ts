import { request } from '../../util/request';

export const login = (postData: { email: string; password: string }) =>
  request({
    url: '/auth/sign-in',
    method: 'POST',
    data: postData,
  });
