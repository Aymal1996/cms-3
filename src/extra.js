export const FIREBASE_API_KEY = "AIzaSyCGlS5XEtI1REvBBe2FsGCP6O7XlBOc2k4";
export const FIREBASE_AUTH_DOMAIN = "ekari-dev.firebaseapp.com";
export const FIREBASE_PROJECTID = "cms2-a10a4";
export const FIREBASE_STORAGE_BUCKET = "ekari-dev.appspot.com";
export const FIREBASE_MESSAGING_SENDER_ID = "740443459448";
export const FIREBASE_APPID = "1:740443459448:web:4f41f9b2a1e560e553c28d";
export const FIREBASE_MEASUREMENTID = "G-3MZWDEWZ8F";


CMS2
import fire from "../../../../utils/firebase";

let mapRef = fire.database().ref().limitToLast(100);

import firebase from "firebase";
import * as firebaseEnums from "./constants";
const config = {
  apiKey: firebaseEnums.FIREBASE_API_KEY,
  authDomain: firebaseEnums.FIREBASE_AUTH_DOMAIN,
  projectId: firebaseEnums.FIREBASE_PROJECTID,
  storageBucket: firebaseEnums.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: firebaseEnums.FIREBASE_MESSAGING_SENDER_ID,
  appId: firebaseEnums.FIREBASE_APPID,
  measurementId: firebaseEnums.FIREBASE_MEASUREMENTID,
  databaseURL: "https://ekari-dev-default-rtdb.firebaseio.com",
};
const fire = firebase.initializeApp(config);

export default fire;