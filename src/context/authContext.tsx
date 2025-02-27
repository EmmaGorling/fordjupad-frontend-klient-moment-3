import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User, LoginCredentials, AuthResponse, AuthContextType} from '../types/auth.types'
const apiUrl = import.meta.env.VITE_API_URL

// Create context
const AuthContext = createContext<AuthContextType | null >(null);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if(!token) return;

            try {
                const res = await fetch(`${apiUrl}/users/validate`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if(!res.ok) {
                    logout();
                } else {
                    const data = await res.json();
                    setUser(data)
                }
            } catch (error) {
                logout();
            }
        }

        checkToken();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            const res = await fetch(`${apiUrl}/users/login`, {
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
            localStorage.setItem('token', data.token);
        } catch (error) {
            throw error;
            
        }
    }

    const logout = async () => {
        setUser(null);
        localStorage.removeItem('token')
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