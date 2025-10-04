import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

import { getFirebaseClientConfig } from "@/lib/firebase/env";

let firebaseApp: FirebaseApp | null = null;
let firestoreInstance: Firestore | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (firebaseApp) {
    return firebaseApp;
  }

  if (getApps().length) {
    firebaseApp = getApp();
    return firebaseApp;
  }

  const config = getFirebaseClientConfig();
  firebaseApp = initializeApp(config);
  return firebaseApp;
}

export function getFirestoreClient(): Firestore {
  if (firestoreInstance) {
    return firestoreInstance;
  }

  const app = getFirebaseApp();
  firestoreInstance = getFirestore(app);
  return firestoreInstance;
}
