import { request } from '../../util/request';

export const getUserInfo = () =>
  request({
    url: '/auth/user-info',
    method: 'GET',
  });
