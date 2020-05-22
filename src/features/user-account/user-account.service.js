import { auth, firestore } from 'common/utils';

const collectionName = 'users';

const createUserDocument = async (user, moreData) => {
  if (!user) return;

  const usersCollnRef = firestore.collection(collectionName);
  const userDocRef = usersCollnRef.doc(user.uid);
  // Get specified user data
  const snapshot = await userDocRef.get();

  // If user doc does not exists then create it
  if (!snapshot.exists) {
    const { email } = user;
    const { employeeId, userRole } = moreData;
    const batch = firestore.batch();

    try {
      // Instantiate objects to be added to db
      const newUser = { employeeId, email, userRole, isActive: true };
      // Add user and user role to batch and then commit
      batch.set(userDocRef, newUser);
      await batch.commit();
    } catch (error) {
      throw error.message;
    }
  }
  // eslint-disable-next-line consistent-return
  return userDocRef;
};

const getUserSnapshotById = async (id) => (
  firestore.collection(collectionName).doc(id).get()
);

const getCurrentUser = async () => (
  new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
);

const signOutUser = () => {
  try {
    auth.signOut();
  } catch (error) {
    throw error.message;
  }
};

const signUpUser = async (credentials) => {
  try {
    const { email, password, ...moreData } = credentials;
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    return await createUserDocument(user, moreData);
  } catch (error) {
    throw error.message;
  }
};

// Get all user roles from firestore
const getAllUserRoles = async (isActive = true) => {
  try {
    const snapshots = await firestore
      .collection('userRoles')
      .where('isActive', '==', isActive)
      .orderBy('value')
      .get();

    return snapshots.docs.map((snapshot) => ({
      ...snapshot.data(),
      id: snapshot.id
    }));
  } catch (error) {
    throw error.message;
  }
};

export {
  getUserSnapshotById,
  getCurrentUser,
  signOutUser,
  signUpUser,
  getAllUserRoles
};
