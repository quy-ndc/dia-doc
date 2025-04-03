import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserZState } from '../assets/types/zustand/user-z';


const useUserStore = create<UserZState>()(
  persist(
    (set) => ({
      name: '',
      email: '',
      isAuthenticated: false,
      setUser: (name, email) => set({ name, email, isAuthenticated: true }),
      logout: () => set({ name: '', email: '', isAuthenticated: false }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;

