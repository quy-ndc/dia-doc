import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserZState } from '../assets/types/zustand/user-z';

const defaultUser = {
  accessToken: '',
  refreshToken: '',
  name: '',
  phone: '',
  blood: '',
  diaType: '',
  gender: '',
  bod: '',
  weight: '',
  height: '',
};

const useUserStore = create<UserZState>()(
  persist(
    (set) => ({
      user: defaultUser,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: defaultUser, isAuthenticated: false }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;
