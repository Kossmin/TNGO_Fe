import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const firebaseConfig = {
  apiKey: "AIzaSyAwDrRFdYmjHsULu281vBQk4PbKWK1yH2I",
  authDomain: "inspired-victor-343905.firebaseapp.com",
  projectId: "inspired-victor-343905",
  storageBucket: "inspired-victor-343905.appspot.com",
  messagingSenderId: "36112236418",
  appId: "1:36112236418:web:1de712d218cd047060199b",
  measurementId: "G-V8NN7NPS0K",
};

var app = initializeApp(firebaseConfig);

export const auth = getAuth();
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider).then((data) => {
    console.log(data);
    return data;
  });
};

export const storage = getStorage(app);
