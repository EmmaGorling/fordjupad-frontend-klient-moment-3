import { createContext, useState, useContext, ReactNode } from "react";
import { User, LoginCredentials, AuthResponse, AuthContextType} from '../types/auth.types'

// Create context
const AuthContext = createContext<AuthContextType | null >(null);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {

    const [user, setUser] = useState<User | null>(null);

    const login = async (credentials: LoginCredentials) => {
        try {
            const res = await fetch("https://forjupad-frontend-moment-3-api.onrender.com/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials),
                credentials: "include"
            });

            if(!res.ok) throw new Error("Inloggning misslyckades");

            const data = await res.json() as AuthResponse;

            setUser(data.user);
        } catch (error) {
            throw error;
            
        }
    }

    const logout = async () => {
        try {
            const res = await fetch("https://forjupad-frontend-moment-3-api.onrender.com/users/logout");

            if(!res.ok) throw new Error("Något gick fel vid utloggningen")
            setUser(null);
        } catch (error) {
            throw error;
        }
        
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}