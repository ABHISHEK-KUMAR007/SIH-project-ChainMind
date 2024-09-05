// import { initializeApp } from "firebase/app";
// import {getAuth,GoogleAuthProvider} from "firebase/auth"
// import {getFirestore} from "firebase/firestore"

// const firebaseConfig = {
//   apiKey: "AIzaSyAIkPNVf0AbZOhSLGc4RLnUQy1RpV8_VfQ",
//   authDomain: "whatsapp-clone-e31bb.firebaseapp.com",
//   projectId: "whatsapp-clone-e31bb",
//   storageBucket: "whatsapp-clone-e31bb.appspot.com",
//   messagingSenderId: "920175657952",
//   appId: "1:920175657952:web:c12d8205cc3da95bfba185"
// };


// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)
// export const googleProvider = new GoogleAuthProvider(app)
// export const database = getFirestore(app)


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2sKWEJUe8lN3KSaC7Z4SvMVJI8AMvT7U",
  authDomain: "mychatt-6cf4e.firebaseapp.com",
  projectId: "mychatt-6cf4e",
  storageBucket: "mychatt-6cf4e.appspot.com",
  messagingSenderId: "282770822965",
  appId: "1:282770822965:web:9875fd3a6c80cd6ed81e7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider(app)
export const database = getFirestore(app)