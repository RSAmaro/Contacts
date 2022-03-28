import { createContext, useContext, useEffect, useState } from 'react';

interface AuthProps {
    loggedIn: boolean | false
}

const DEFAULT_VALUE: AuthProps = {
    loggedIn: false
};

export const AuthContext = createContext(DEFAULT_VALUE);

const AuthProvider = (props: any) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        // saved login state from localStorage / AsyncStorage
    }, []);

    const login = () => {
        setLoggedIn(true);
    };

    const logout = () => {
        setLoggedIn(false);
    };

    const authContextValue = {
        login,
        loggedIn: Boolean,
        logout
    };

    return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };