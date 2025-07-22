import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDh_WmaPMxLmRNyulxfuYjTIwRfSbHHFWU",
  authDomain: "webprogfinals.firebaseapp.com",
  projectId: "webprogfinals",
  storageBucket: "webprogfinals.firebasestorage.app",
  messagingSenderId: "815231122082",
  appId: "1:815231122082:web:2e76a3a9964268b043b5fb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;