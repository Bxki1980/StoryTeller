import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'userToken';

export const storeToken = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

//to see if the user has lunched the app for the first time or not
export const getFirstLaunchFlag = async () => {
  return await AsyncStorage.getItem('hasLaunchedBefore');
};

export const setFirstLaunchFlag = async () => {
  await AsyncStorage.setItem('hasLaunchedBefore', 'true');
};
