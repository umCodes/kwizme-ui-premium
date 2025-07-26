import { useEffect, useState, type ReactNode } from "react"
import { AuthContext } from "../context/AuthContext";
import type { User } from "../types/User";
import { getUser } from "../services/auth";

const AuthProvider = ({children}: {children: ReactNode}) => {

    const [user, setUser] = useState<User | null>(null);
  
    let retries = 0;
    async function logUser(){
            try {
                const response = await getUser();
                console.log(response)
                setUser(response);
            } catch (error) {
                console.error(error);
                const delay = Math.pow(2, retries) * 2000;
                retries++;
                setTimeout(getUser, delay);                
            }    
    }

    useEffect(()=>{
        console.log("user", user);
        
        logUser();
    }, []);
    return (
    <AuthContext.Provider value={{user, setUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider