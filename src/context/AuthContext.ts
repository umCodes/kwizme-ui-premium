import { createContext, type Dispatch, type SetStateAction } from "react";
import type { User } from "../types/User";


export type UserState = {
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>
}
export const AuthContext = createContext<UserState>({
    user: null,
    setUser: () => {}
});