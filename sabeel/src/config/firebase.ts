import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore, doc, getDocFromServer } from 'firebase/firestore';

// Default config fallback
let rawConfig: Record<string, string> = {};

try {
  // Try importing local json config if present
  const localConfig = await import('../../firebase-applet-config.json').then(m => m.default || m).catch(() => null);
  if (localConfig) {
    rawConfig = localConfig;
  }
} catch (e) {
  console.debug('No local firebase-applet-config.json found, checking environment variables.');
}

const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || rawConfig.projectId || 'probable-card-fdw25',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || rawConfig.appId || '1:1092103971403:web:5f19c3a258c044aea1e3ce',
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || rawConfig.apiKey || 'AIzaSyAD5-W_Xqg13kVjHFOEwRDRZ-yjqU8uhuY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || rawConfig.authDomain || 'probable-card-fdw25.firebaseapp.com',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || rawConfig.storageBucket || 'probable-card-fdw25.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || rawConfig.messagingSenderId || '1092103971403',
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || rawConfig.firestoreDatabaseId || '(default)',
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  if (app) {
    // Attempt with custom databaseId, fallback to default
    try {
      db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    } catch {
      try {
        db = getFirestore(app);
      } catch (err) {
        console.warn('Firestore initialization failed:', err);
      }
    }
    
    try {
      auth = getAuth(app);
    } catch (err) {
      console.warn('Firebase Auth initialization failed:', err);
    }
  }
} catch (error) {
  console.warn('Firebase safe initialization warning:', error);
}

// Safe asynchronous test connection that never throws
if (db) {
  (async () => {
    try {
      await getDocFromServer(doc(db as Firestore, 'test', 'connection'));
    } catch {
      // Gracefully silent in offline or restricted environments
    }
  })();
}

export { app, db, auth };

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.warn('Firestore Notice: ', JSON.stringify(errInfo));
  return errInfo;
}
