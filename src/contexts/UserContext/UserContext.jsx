/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { activateUser, checkAuthStatus, logoutUser } from '@/services/auth-actions';
import { useToast } from '@/components/ui/use-toast';
import LoadingScreen from '@/components/ui/loading-screen';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showReactivateDialog, setShowReactivateDialog] = useState(false);
    const [isReactivating, setIsReactivating] = useState(false);
    const { toast } = useToast();

    const checkUserStatus = (userData) => {
        if (userData.is_active === false) {
            setShowReactivateDialog(true);
            setIsLogged(false);
            setUser(userData);
            return false;
        }
        setIsLogged(true);
        setUser(userData);
        return true;
    };

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await checkAuthStatus();
                
                if (response.isAuthenticated && response.user) {
                    checkUserStatus(response.user);
                } else {
                    setIsLogged(false);
                    setUser(null);
                }
            } catch (error) {
                console.error("Error checking authentication status:", error);
                setIsLogged(false);
                setUser(null);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        };

        verifyAuth();
    }, []);

    const handleReactivateAccount = async () => {
        try {
            setIsReactivating(true);
            const response = await activateUser(user.id);
            if (response.success) {
                const updatedUser = { ...user, is_active: true };
                setUser(updatedUser);
                setIsLogged(true);
                setShowReactivateDialog(false);
                toast({
                    title: "Account Reactivated",
                    description: "Welcome back! Your account has been reactivated successfully.",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to reactivate account. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsReactivating(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            setIsLogged(false);
            setUser(null);
            setShowReactivateDialog(false);
            toast({
                title: "Session closed",
                description: "You have been logged out of your account.",
            });
            window.dispatchEvent(new CustomEvent('user-logged-out'));
            return true;
        } catch (error) {
            console.error("Error during logout:", error);
            setIsLogged(false);
            setUser(null);
            setShowReactivateDialog(false);
            window.dispatchEvent(new CustomEvent('user-logged-out'));
            return true;
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <UserContext.Provider value={{
            isLogged,
            setIsLogged,
            user,
            setUser: (userData) => {
                if (userData) {
                    checkUserStatus(userData);
                } else {
                    setUser(null);
                    setIsLogged(false);
                }
            },
            isLoading,
            logout: handleLogout
        }}>
            {children}
            {user && user.is_active === false && (
                <AlertDialog open={showReactivateDialog} onOpenChange={setShowReactivateDialog}>
                    <AlertDialogContent className="bg-voidBlack border-f2green/20">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-f2green">Welcome Back!</AlertDialogTitle>
                            <AlertDialogDescription className="text-neutral-400">
                                Your account was previously deactivated. Would you like to reactivate it now?
                                You&apos;ll regain access to all your data and boards.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel 
                                className="bg-voidBlack border-f2green text-f2green hover:bg-f2green/10"
                                onClick={() => handleLogout()}
                            >
                                No, log out
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleReactivateAccount}
                                className="bg-f2green text-voidBlack hover:bg-fgreen"
                                disabled={isReactivating}
                            >
                                {isReactivating ? (
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : null}
                                Yes, reactivate my account
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
