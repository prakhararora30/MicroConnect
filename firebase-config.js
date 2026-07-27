/**
 * Firebase Web Configuration & SDK Initialization
 * Project: connect-firebase2005
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  updateDoc, 
  deleteDoc,
  arrayUnion, 
  arrayRemove, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getMessaging,
  getToken,
  onMessage
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js";

// Firebase Configuration Object
const firebaseConfig = {
  apiKey: "AIzaSyBMvJ-gu9X_6hSHl0kMyhQg3iJjmDIKJoI",
  authDomain: "connect-firebase2005.firebaseapp.com",
  projectId: "connect-firebase2005",
  storageBucket: "connect-firebase2005.firebasestorage.app",
  messagingSenderId: "427592900853",
  appId: "1:427592900853:web:6a3eebee6cf6f3450de5bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

export { 
  app, 
  auth, 
  db, 
  messaging,
  getToken,
  onMessage,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut, 
  updateProfile,
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  updateDoc, 
  deleteDoc,
  arrayUnion, 
  arrayRemove, 
  serverTimestamp 
};
