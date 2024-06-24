import { create } from 'zustand';

interface UserInfo {
  avatar: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isCoach: boolean;
  setUserInfo: (userInfo: Partial<UserInfo>) => void;
}

const userStore = create<UserInfo>((set) => ({
  avatar: '',
  name: '',
  email: '',
  isAdmin: false,
  isCoach: false,
  setUserInfo: (userInfo) => set((state) => ({ ...state, ...userInfo })),
}));

export default userStore;
