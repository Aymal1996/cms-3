import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAD8s8V3sWDt4AmhAF4LY47C5_JbaYgmSk",
    authDomain: "raisd-61ff6.firebaseapp.com",
    // databaseURL: "https://raisd-61ff6-default-rtdb.firebaseio.com",
    projectId: "raisd-61ff6",
    storageBucket: "raisd-61ff6.appspot.com",
    messagingSenderId: "516225919297",
    appId: "1:516225919297:web:59733e8c7dc9e87c25d9c0",
    // measurementId: "G-W3S8S76T83"
};

export const fire = initializeApp(firebaseConfig);
export const database = getFirestore(fire);