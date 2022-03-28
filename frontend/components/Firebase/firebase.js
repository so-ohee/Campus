import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    // apiKey: process.env.NEXT_PUBLIC_API_Key,
    // authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    // databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
    // projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    // storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    // messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_ID,
    // appId: process.env.NEXT_PUBLIC_APP_ID
    apiKey: "AIzaSyApd4lGkJxuqynhiZQ6Jj2OMu-xrDPILpo",
    authDomain: "campus-92be1.firebaseapp.com",
    databaseURL: "https://campus-92be1-default-rtdb.firebaseio.com",
    projectId: "campus-92be1",
    storageBucket: "campus-92be1.appspot.com",
    messagingSenderId: "810743878732",
    appId: "810743878732:web:1e68182b18b1de8e2a50e9"
};

// export default firebase.initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
export const authService = firebase.auth();