import { User } from "@prisma/client"
import { create } from "zustand"

interface IUserStore {
  currentUser: User | null | undefined
  setCurrentUser: (currentUser: User) => void
}

export const useUserStore = create<IUserStore>((set) => ({
  currentUser: null as User | null | undefined,
  setCurrentUser: (currentUser: User) => set({ currentUser }),
}))
