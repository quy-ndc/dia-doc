import { create } from 'zustand';


const useUserStore = create<UserZState>((set) => ({
  name: '',
  email: '',
  isAuthenticated: false,
  setUser: (name, email) => set({ name, email, isAuthenticated: true }),
  logout: () => set({ name: '', email: '', isAuthenticated: false }),
}));

export default useUserStore;

