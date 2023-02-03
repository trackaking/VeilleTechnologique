// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCjEhJyyEIgT_saqiJgS4zVlHZ0DaJCIF4",
    authDomain: "carwatcher-72aca.firebaseapp.com",
    databaseURL: "https://carwatcher-72aca-default-rtdb.firebaseio.com",
    projectId: "carwatcher-72aca",
    storageBucket: "carwatcher-72aca.appspot.com",
    messagingSenderId: "1037424780676",
    appId: "1:1037424780676:web:44f2ee8d6bedc638dba9d1",
    measurementId: "G-EGKQGZJ23L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
