import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyB68UPLxBB3wXcviU_1wAkbToksb-iTshk',
  authDomain: 'pokechek-669e8.firebaseapp.com',
  databaseURL:
    'https://pokechek-669e8-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'pokechek-669e8',
  storageBucket: 'pokechek-669e8.appspot.com',
  messagingSenderId: '863769958086',
  appId: '1:863769958086:web:a35ef2ef4a8d83af9769c7',
});

export const EmailProvider = new firebase.auth.EmailAuthProvider();

export const auth = firebaseConfig.auth();
export const firestore = firebaseConfig.firestore();
export default firebaseConfig;
