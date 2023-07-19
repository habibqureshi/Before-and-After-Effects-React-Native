import {initializeApp} from 'firebase/app';

import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCALViIRavPw4m7oP1O8nnweZ4UcxwsdOU',
  authDomain: 'beforeafter-7040a.firebaseapp.com',
  projectId: 'beforeafter-7040a',
  storageBucket: 'beforeafter-7040a.appspot.com',
  messagingSenderId: '536256767534',
  appId: '1:536256767534:web:c5e3e22855457ac3f7a1bf',
  measurementId: 'G-HMZT738V8W',
};
export const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);
export const auth = getAuth(app);
