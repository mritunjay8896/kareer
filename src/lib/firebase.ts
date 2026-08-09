import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Dynamically check for firebase-applet-config.json without causing Rollup resolution error if missing
const configModules = import.meta.glob<Record<string, any>>('../../firebase-applet-config.json', { eager: true });
const configKeys = Object.keys(configModules);
const loadedConfig = configKeys.length > 0 ? (configModules[configKeys[0]].default || configModules[configKeys[0]]) : {};

const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || loadedConfig.projectId || "global-operator-2bndl",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || loadedConfig.appId || "1:84831818696:web:3bf87765f72b644bab26fd",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || loadedConfig.apiKey || "AIzaSyDH0ecbopGMII4pwciTJe57HtCQEuB-6is",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || loadedConfig.authDomain || "global-operator-2bndl.firebaseapp.com",
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || loadedConfig.firestoreDatabaseId || "ai-studio-careerpulseindia-cab55dc0-a759-4a0f-9cee-6ce5529489b8",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || loadedConfig.storageBucket || "global-operator-2bndl.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || loadedConfig.messagingSenderId || "84831818696",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

// Explicitly set browserLocalPersistence to guarantee session state across tab reloads and browser restarts
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn('Firebase setPersistence warning:', err);
});

export const googleProvider = new GoogleAuthProvider();

export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const storage = getStorage(app);


