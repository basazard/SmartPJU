import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbZJwVcHl3RM7OguPoCtsk1NMYe5mbq04",
  authDomain: "newsmartpju.firebaseapp.com",
  databaseURL: "https://newsmartpju-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "newsmartpju",
  storageBucket: "newsmartpju.appspot.com",
  messagingSenderId: "210209192237",
  appId: "1:210209192237:web:6784832906f308c99a3ba4",
  measurementId: "G-LY742NMK6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();

export const teganganPVRef = ref(db, "loadvoltage_PV");
onValue(teganganPVRef, (snapshot) => {
  const data = snapshot.val();
});

export const arusPVRef = ref(db, "current_mA_PV");
onValue(arusPVRef, (snapshot) => {
  const data = snapshot.val();
});

export const dayaPVRef = ref(db, "power_mW_PV");
onValue(dayaPVRef, (snapshot) => {
  const data = snapshot.val();
});

export const teganganBattRef = ref(db, "loadvoltage_Batt");
onValue(teganganBattRef, (snapshot) => {
  const data = snapshot.val();
});

export const arusBattRef = ref(db, "current_mA_Batt");
onValue(arusBattRef, (snapshot) => {
  const data = snapshot.val();
});

export const dayaBattRef = ref(db, "power_mW_Batt");
onValue(dayaBattRef, (snapshot) => {
  const data = snapshot.val();
});

export const karbonRef = ref(db, "karbondioksida");
onValue(karbonRef, (snapshot) => {
  const data = snapshot.val();
});

export const luxRef = ref(db, "lux");
onValue(luxRef, (snapshot) => {
  const data = snapshot.val();
});

export const Mode = ref(db, "Mode");
onValue(Mode, (snapshot) =>{
  const data = snapshot.val();
});
