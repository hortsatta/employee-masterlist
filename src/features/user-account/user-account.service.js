import { firebase, auth, firestore } from 'common/utils';

const createUserDocument = async (user, moreData) => {
  if (!user) return;

  const usersCollnRef = firestore.collection('users');
  const userDocRef = usersCollnRef.doc(user.uid);
  // Get specified user data
  const snapshot = await userDocRef.get();

  // If user doc does not exists then create it
  if (!snapshot.exists) {
    const { email } = user;
    const { employeeId, userRoleId } = moreData;
    const batch = firestore.batch();
    const fieldValue = firebase.firestore.FieldValue;
    const userRoleDocRef = userDocRef.collection('userRole').doc();

    try {
      // Instantiate objects to be added to db
      const newUser = { employeeId, email };
      const newUserRole = { userRoleId, dateFrom: fieldValue.serverTimestamp() };
      // Add user and user role to batch and then commit
      batch.set(userDocRef, newUser);
      batch.set(userRoleDocRef, newUserRole);
      await batch.commit();
    } catch (error) {
      throw error.message;
    }
  }
  // eslint-disable-next-line consistent-return
  return userDocRef;
};

const getUserSnapshotById = async (id) => (
  firestore.collection('users').doc(id).get()
);

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
    throw error.message;
  }
};

export { getUserSnapshotById, getCurrentUser, signUpUser };
