import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged as fbOnAuthStateChanged,
  type User,
} from "firebase/auth";

function requireEnv(name: string): string {
  const v = (import.meta as any).env?.[name];
  if (!v) throw new Error(`Missing ${name}. Set it in your .env (Vite requires VITE_ prefix).`);
  return String(v);
}

const firebaseConfig = {
  apiKey: requireEnv("VITE_FIREBASE_API_KEY"),
  authDomain: requireEnv("VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: requireEnv("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: requireEnv("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: requireEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: requireEnv("VITE_FIREBASE_APP_ID"),
  measurementId: (import.meta as any).env?.VITE_FIREBASE_MEASUREMENT_ID || undefined,
};

export const app: FirebaseApp = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Analytics only works in browser contexts and only if supported.
export async function initAnalytics() {
  try {
    if (typeof window === "undefined") return null;
    const ok = await isSupported();
    if (!ok) return null;
    return getAnalytics(app);
  } catch {
    return null;
  }
}

export async function signUp(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function login(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return await signOut(auth);
}

export function onAuthStateChanged(cb: (user: User | null) => void) {
  return fbOnAuthStateChanged(auth, cb);
}


