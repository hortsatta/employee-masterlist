import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import moment from 'moment';

// Set firebase config from dotenv
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_API_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_API_DATABASE_URL,
  projectId: process.env.REACT_APP_API_PROJECT_ID,
  storageBucket: process.env.REACT_APP_API_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_API_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_API_APP_ID,
  measurementId: process.env.REACT_APP_API_MEASUREMENT_ID
};
// Initialise firebase app
firebase.initializeApp(config);
// Declare firebase authentication and database
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage().ref();

// Batch adding of documents to db
const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    // Get a new doc with generated id
    // Add to batch for single firebase communication
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return batch.commit();
};

const getDateFromTimestamp = ({ seconds, nanoseconds }) => (
  moment((new firebase.firestore.Timestamp(seconds, nanoseconds)).toDate())
);

export {
  firebase,
  auth,
  firestore,
  storage,
  addCollectionAndDocuments,
  getDateFromTimestamp
};
