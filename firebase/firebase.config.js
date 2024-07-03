import {initializeApp} from 'firebase/app';

import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import storage from '@react-native-firebase/storage';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

export const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);
export const auth = getAuth(app);
