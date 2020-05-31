const CryptoJS = require('crypto-js');
import {ENCRYPT_SECRET} from 'react-native-dotenv'

export const encrypt = (text) =>
  CryptoJS.AES
    .encrypt(text, ENCRYPT_SECRET)
    .toString();

export const decrypt = (encryptedText) => {
  try {
    const bytes  = CryptoJS.AES.decrypt(encryptedText, ENCRYPT_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (e) {
    console.log(e);
  }
};