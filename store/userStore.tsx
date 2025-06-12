import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { User, UserZState } from '../assets/types/zustand/user-z'
import { UserRole } from '../assets/enum/user-role'

const defaultUser: User = {
  isAuthenticated: false,
  isSetUp: false,
  accessToken: '',
  refreshToken: '',
  id: '',
  role: UserRole.PATIENT,
  fullname: '',
  avatar: '',
  phone: '',
  blood: 0,
  diaType: 0,
  gender: 0,
  bod: '',
  weight: 0,
  height: 0,
}

const useUserStore = create<UserZState>()(
  persist(
    (set) => ({
      user: defaultUser,
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: defaultUser })
      }
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useUserStore
