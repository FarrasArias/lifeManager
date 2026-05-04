import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDvzuQ5K0q2yPIHoMTVvk3qgDkjnbihq-Y',
  authDomain: 'my-life-app-95ef2.firebaseapp.com',
  projectId: 'my-life-app-95ef2',
  storageBucket: 'my-life-app-95ef2.firebasestorage.app',
  messagingSenderId: '1036646443913',
  appId: '1:1036646443913:web:04d6f8fbbf5a7a25fc0f58',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
