import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAZx6awBfvTU5FmuqB1ya_tMl7AQX_9-aI",
    authDomain: "sp-1-b2e7c.firebaseapp.com",
    databaseURL: "https://sp-1-b2e7c-default-rtdb.firebaseio.com",
    projectId: "sp-1-b2e7c",
    storageBucket: "sp-1-b2e7c.appspot.com",
    messagingSenderId: "529531004149",
    appId: "1:529531004149:web:141fcf3a881ef9e43e51bc",
    measurementId: "G-11CLXLQ541",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, db, storage, firestore };