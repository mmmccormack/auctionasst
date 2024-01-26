// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCiqh-ZNVfrQbP8R37oN4jHkJaPrBmbPm0",

  authDomain: "auction-asst.firebaseapp.com",

  projectId: "auction-asst",

  storageBucket: "auction-asst.appspot.com",

  messagingSenderId: "896678402002",

  appId: "1:896678402002:web:090735d31cf551897b5a0b"

};


// Initialize Firebase

const firebase = initializeApp(firebaseConfig);

export default firebase;