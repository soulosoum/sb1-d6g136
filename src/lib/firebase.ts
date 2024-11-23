import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDqm8j4LVR8NQXG_Nyt-PvRqwQoA8VhQhY",
  authDomain: "fasoplay-demo.firebaseapp.com",
  projectId: "fasoplay-demo",
  storageBucket: "fasoplay-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789jkl"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Enable auth emulator in development
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
}

export { auth };