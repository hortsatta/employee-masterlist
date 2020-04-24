import { auth, firestore } from 'common/firebase/firebase.utils';

const createUserDocument = async (userAuth, moreData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get;

  if (!snapshot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        email,
        createdAt,
        ...moreData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  // eslint-disable-next-line consistent-return
  return userRef;
};

const getCurrentUser = async () => (
  new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
);

const signUpUser = async (credentials) => {
  try {
    const { email, password, ...moreData } = credentials;
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    return await createUserDocument(user, moreData);
  } catch (error) {
    console.log('error sign up user', error.message);
  }

  return null;
};

export { getCurrentUser, signUpUser };
