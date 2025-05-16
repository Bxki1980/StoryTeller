import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


    const login = async (email: string, password: string) => {
        const token = await loginApi(email, password);
        await AsyncStorage.setItem('userToken', token);
        setUserToken(token);
    }

    const signup = async (email: string , password: string) => {
        const token = await signupApi(email, password);
        await AsyncStorage.setItem('userToken', token);
        setUserToken(token);
    }

    const logout = async () => {
        await AsyncStorage.removeItem('userToken');
        setUserToken(null);
        setLoading(false);
    }

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
        setLoading(false);
    }

    useEffect(() => {
        checkToken();
    }, []);

}
    return (
        <AuthContext.Provider value={{userToken, login, signup, logout, loading}}>
            {children}
        </AuthContext.Provider>
  );
};