import { auth } from 'common/firebase/firebase.utils';

const signInWithEmail = async (credentials) => {
  try {
    const { email, password } = credentials;
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    throw error.message;
  }
};

export { signInWithEmail };
