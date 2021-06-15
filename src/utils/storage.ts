import AsyncStorage from '@react-native-community/async-storage';

const getFromstorage = async (key: any) => await AsyncStorage.getItem(key);

const saveToStorage = async (key: any, value: any) => {
  console.log("call", value, key)
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    __DEV__ && console.log("err async", error);
  }
  return null;
};

const storage = {
  get: (key: string) => getFromstorage(key),
  set: (key: string, value: any) => saveToStorage(key, value),
};

export default storage;
