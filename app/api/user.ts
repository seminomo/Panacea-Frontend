import { request } from '../../util/request';

interface UserInfo {
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  isCoach: boolean;
  coachStatus: string;
  code: string;
  // Add other fields as necessary
}

export const getUserInfo = async (): Promise<UserInfo> => {
  return request({
    url: 'api/auth/user-info',
    method: 'GET',
  });
};
