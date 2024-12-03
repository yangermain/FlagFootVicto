import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDzjjolf7guFExRugr9hXcinzxn93tVCZ8",
  authDomain: "flagfootvicto.firebaseapp.com",
  projectId: "flagfootvicto",
  storageBucket: "flagfootvicto.firebasestorage.app",
  messagingSenderId: "296233242384",
  appId: "1:296233242384:web:7892bf2fffb9528ae5df95",
  measurementId: "G-MKQY9C68YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics and export it
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };
