import { create } from "zustand"
import { v4 as uuidv4 } from 'uuid'
import { persist } from "zustand/middleware"

interface User {
    id: string
    firstname: string
    lastname: string
    age: number
    hobbies: string[]
}

type UserStoreState = {
    users: User[]
    addUser: (user: Omit<User, 'id'>) => void
    deleteUser: (id: string) => void
}

export const useUserStore = create<UserStoreState>()(
    persist(
        (set) => ({
            users: [],
            addUser: (user) => {
                const newUser = { ...user, id: uuidv4() }
                set((state) => ({ users: [...state.users, newUser] }))
            },
            deleteUser: (id) => set(((state) => ({ users: state.users.filter(u => u.id !== id) })))
        }),
        {
            name: 'user-storage'
        }
    ))
