// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxsz2ivn_OeTb7xrgL9WqPNtUDzkpA5Do",
  authDomain: "practice2-ee8d5.firebaseapp.com",
  projectId: "practice2-ee8d5",
  storageBucket: "practice2-ee8d5.appspot.com",
  messagingSenderId: "634056840047",
  appId: "1:634056840047:web:7703ec521c8e4d6dfd4e9a"
};

const app = initializeApp(firebaseConfig);

//사용 안할 예정
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };