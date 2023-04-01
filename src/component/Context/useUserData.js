import create from "zustand";
import { persist } from "zustand/middleware";

const img =
  "https://ipfs.io/ipfs/bafybeif7kurkknls2nd2mmq6l5wq76wraqn2mfjotsienwa5q2ndypgd6u/ava.png";

export const useUserData = create((set) => ({
  isLogged: false,
  address: "Not Connected",
  username: "viral",
  email: "mail@email.com",
  avatar: img,
  bio: "something about yourself in few words",
  webpage: "url",
  network: "none",
  login: (address) => set({ address, isLogged: true }),
  setNetwork: (network) => set({ network }),
  setAvatar: (avatar) => set({ avatar }),
  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  setBio: (bio) => set({ bio }),
  setWebpage: (webpage) => set({ webpage }),
  logout: () =>
    set({
      address: "Not Connected",
      isLogged: false,
      network: "none",
      avatar: img,
    }),
}));
