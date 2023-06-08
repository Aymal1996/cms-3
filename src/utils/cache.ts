import { CryptoJS } from "./libs";

export const SK = "abc";

export const saveToLocal = (key, data, isJson = true, isEncrypted = false) => {
  let saveData = data;
  if (data && isJson) {
    saveData = JSON.stringify(data);
  }
  if (saveData && isEncrypted) {
    saveData = CryptoJS.AES.encrypt(saveData, SK).toString();
  }
  global.localStorage.setItem(key, saveData);
  return saveData;
};

export const getFromLocal = (key, isJson = true, isEncrypted = false) => {
  let data = global.localStorage.getItem(key);
  if (data && isEncrypted) {
    const bytes = CryptoJS.AES.decrypt(data.toString(), SK);
    data = bytes.toString(CryptoJS.encUTF8);
  }
  if (data && isJson) {
    data = JSON.parse(data);
  }
  return data;
};

export const removeFromLocal = (key) => {
  global.localStorage.removeItem(key);
};

export const existInLocal = (key) => global.localStorage.getItem(key) != null;
