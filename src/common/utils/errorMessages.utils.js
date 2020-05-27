const signInMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
    case 'auth/invalid-email':
      return 'Your email is not valid.';
    case 'auth/wrong-password':
      return 'Your password is incorrect.';
    case 'auth/too-many-requests':
      return 'Too many sign in attempts. Try again later.';
    default:
      return 'Your email or password is incorrect. Please try again.';
  }
};

export { signInMessage };
