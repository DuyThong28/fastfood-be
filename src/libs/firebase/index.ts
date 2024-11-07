import * as firebaseAdmin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
const adminConfig: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};
export default () => {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(adminConfig),
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  });
};
