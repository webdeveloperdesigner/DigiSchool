import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBd6omkLTFrMyKj_rAvED-zdbmE2vdeLKE",
  authDomain: "digischool-by-deepanshu.firebaseapp.com",
  databaseURL: "https://digischool-by-deepanshu-default-rtdb.firebaseio.com",
  projectId: "digischool-by-deepanshu",
  storageBucket: "digischool-by-deepanshu.firebasestorage.app",
  messagingSenderId: "850999331949",
  appId: "1:850999331949:android:20bf2dfb485e6bbb038364"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
