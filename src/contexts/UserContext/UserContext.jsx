/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { checkAuthStatus, logoutUser } from '@/services/auth-actions';
import { useToast } from '@/components/ui/use-toast';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    // Check authentication status on component mount
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                setIsLoading(true);
                const response = await checkAuthStatus();
                
                if (response.isAuthenticated && response.user) {
                    setIsLogged(true);
                    setUser(response.user);
                } else {
                    setIsLogged(false);
                    setUser(null);
                }
            } catch (error) {
                console.error("Error checking authentication status:", error);
                setIsLogged(false);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setIsLogged(false);
            setUser(null);
            toast({
                title: "Session closed",
                description: "You have been logged out of your account.",
            });
            return true;
        } catch (error) {
            console.error("Error during logout:", error);
            // Even if there's an error, we want to clear the client-side state
            setIsLogged(false);
            setUser(null);
            return true;
        }
    };

    return (
        <UserContext.Provider value={{
            isLogged,
            setIsLogged,
            user,
            setUser,
            isLoading,
            logout: handleLogout
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
