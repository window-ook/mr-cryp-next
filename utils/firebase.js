import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

if (!getApps().length) initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export async function loginGoogle() {
  return signInWithPopup(auth, provider).then(result => {
    const user = result.user;
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('socialType', 'google');
    localStorage.setItem('userId', user.uid);
    localStorage.setItem('nickname', user.displayName);
    localStorage.setItem('imgUrl', user.photoURL);
    return user;
  });
}

export async function logoutGoogle() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('구글 로그아웃 오류:', error);
  }
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, user => {
    callback(user);
  });
}
