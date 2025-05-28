import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface AuthContextProps {
  userToken: string | null;
  isLoading: boolean;
  isFirstLaunch: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(false);



  const checkFirstLaunch = async () => {
    const hasLaunched = await AsyncStorage.getItem('hasLaunchedBefore');
    if (hasLaunched === null) {
      await AsyncStorage.setItem('hasLaunchedBefore', 'true');
      setIsFirstLaunch(true);
    } else {
      setIsFirstLaunch(false);
    }
  };



  useEffect(() => {
    const init = async () => {
      await checkFirstLaunch();
    };
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, isLoading, isFirstLaunch }}>
      {children}
    </AuthContext.Provider>
  );
};
