import { auth, signInMessage } from 'common/utils';

const signInWithEmail = async (credentials) => {
  try {
    const { email, password } = credentials;
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    throw signInMessage(error.code);
  }
};

export { signInWithEmail };
