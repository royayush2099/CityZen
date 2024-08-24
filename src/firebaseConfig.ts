// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAjiTq4p3gKOmU_sZPMo0HtmYoSuCNA0hU",
    authDomain: "cityzen-cbc03.firebaseapp.com",
    projectId: "cityzen-cbc03",
    storageBucket: "cityzen-cbc03.appspot.com",
    messagingSenderId: "350883202545",
    appId: "1:350883202545:web:0798874a792499d0a07050",
    measurementId: "G-B49E55B03J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
