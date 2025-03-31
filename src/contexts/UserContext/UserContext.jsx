/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLogged, setisLogged] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState();

    useEffect(() => {
        if(!token){
            setisLogged(false)
            setUser({})
        } else {
            setisLogged(true)
        }
    }, [token]);

    return (
        <UserContext.Provider value={{
            isLogged,
            setisLogged,
            user,
            setUser,
            token,
            setToken
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
