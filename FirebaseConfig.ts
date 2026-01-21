// Import required Firebase modules (using compat for Expo Go compatibility)
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { 
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID
} from '@env';

// Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Ensure Firebase is initialized only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase services
export const FIREBASE_DB = firebase.firestore();
export const FIREBASE_AUTH = firebase.auth();

// Initialize Analytics only on web (safe dynamic import)
if (typeof window !== 'undefined' && (window as any).document) {
  // dynamic import to avoid bundler issues on native platforms
  import('firebase/analytics')
    .then(({ getAnalytics }) => {
      try {
        // initialize analytics if measurement id is present
        if (FIREBASE_MEASUREMENT_ID) {
          getAnalytics(FIREBASE_APP);
        }
      } catch (e) {
        // ignore analytics initialization errors on non-web environments
        // (keeps native builds from failing if analytics isn't available)
        // console.debug('Analytics init skipped', e);
      }
    })
    .catch(() => {
      // ignore import errors (analytics may not be available in native builds)
    });
}
