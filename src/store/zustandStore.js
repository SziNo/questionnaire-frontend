import { create } from "zustand";

const useStore = create((set) => ({
  isLoggedIn: false,
  isAdmin: false,
  setIsLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  setIsAdmin: (admin) => set({ isAdmin: admin }),
}));

export default useStore;
