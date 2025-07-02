import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDddUdqR_j1U6AZnfMqqTZx8j3OkGTDOsw",
  authDomain: "tareasapp-87836.firebaseapp.com",
  databaseURL: "https://tareasapp-87836-default-rtdb.firebaseio.com", // RTDB aquí
  projectId: "tareasapp-87836",
  storageBucket: "tareasapp-87836.appspot.com",
  messagingSenderId: "211410899590",
  appId: "1:211410899590:web:af3fe370e36feb028f7707",
  measurementId: "G-P5TGFG4BWK"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); // ahora usamos RTDB
