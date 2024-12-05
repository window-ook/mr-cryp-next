let auth; // 전역 변수로 선언하여 한 번만 초기화되도록

export async function initializeFirebase() {
  if (!auth) {
    const { initializeApp, getApps } = await import('firebase/app');
    const { getAuth, GoogleAuthProvider } = await import('firebase/auth');

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    };

    if (!getApps().length) initializeApp(firebaseConfig);

    auth = getAuth();
    auth.provider = new GoogleAuthProvider();
  }
}

export async function loginGoogle() {
  await initializeFirebase(); // 초기화 함수 호출
  const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');

  return signInWithPopup(auth, auth.provider).then(result => {
    const user = result.user;
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('socialType', 'Google');
    localStorage.setItem('userId', user.uid);
    localStorage.setItem('nickname', user.displayName);
    localStorage.setItem('imgUrl', user.photoURL);
    return user;
  });
}

export async function logoutGoogle() {
  await initializeFirebase(); // 초기화 함수 호출
  const { signOut } = await import('firebase/auth');

  try {
    await signOut(auth);
  } catch (error) {
    console.error('구글 로그아웃 오류:', error);
  }
}

export async function onUserStateChange(callback) {
  await initializeFirebase(); // 초기화 함수 호출
  const { onAuthStateChanged } = await import('firebase/auth');

  onAuthStateChanged(auth, user => {
    callback(user);
  });
}
