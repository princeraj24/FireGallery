import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2Nyg1_u99OVYqkXbxd96d9gfZisfe278",
  authDomain: "ninja-firegram-7d366.firebaseapp.com",
  projectId: "ninja-firegram-7d366",
  storageBucket: "ninja-firegram-7d366.firebasestorage.app",
  messagingSenderId: "235539565310",
  appId: "1:235539565310:web:b0271b791ab2698e65b3af"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export{ projectFirestore, projectAuth, timestamp };
