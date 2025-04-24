import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// const firebaseConfig = {
//   apiKey: "AIzaSyBd6omkLTFrMyKj_rAvED-zdbmE2vdeLKE",
//   authDomain: "digischool-by-deepanshu.firebaseapp.com",
//   databaseURL: "https://digischool-by-deepanshu-default-rtdb.firebaseio.com",
//   projectId: "digischool-by-deepanshu",
//   storageBucket: "digischool-by-deepanshu.firebasestorage.app",
//   messagingSenderId: "850999331949",
//   appId: "1:850999331949:android:20bf2dfb485e6bbb038364"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCXPdkQfdLyLQNdMQ4EUHc7aqcRJB6C3A8",
  authDomain: "digischool-50d9b.firebaseapp.com",
  projectId: "digischool-50d9b",
  storageBucket: "digischool-50d9b.firebasestorage.app",
  messagingSenderId: "997243877313",
  appId: "1:997243877313:web:1fe3792c82c61fd0876140",
  measurementId: "G-99DVFRGRYC"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
