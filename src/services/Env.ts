import { ConfigObject, FirebaseConfig } from './Config';

export class Env {
  apiURL: string;
  githubToken: string;
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;

  constructor(env: ImportMetaEnv) {
    this.apiURL = env.VITE_API_URL ?? null;
    this.githubToken = env.VITE_OCTOKIT_AUTH ?? null;
    this.apiKey = env.VITE_FIREBASE_API_KEY ?? null;
    this.authDomain = env.VITE_FIREBASE_AUTH_DOMAIN ?? null;
    this.databaseURL = env.VITE_FIREBASE_DATABASE_URL ?? null;
    this.projectId = env.VITE_FIREBASE_PROJECT_ID ?? null;
    this.storageBucket = env.VITE_FIREBASE_STORAGE_BUCKET ?? null;
    this.messagingSenderId = env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? null;
    this.appId = env.VITE_FIREBASE_APP_ID ?? null;
    this.measurementId = env.VITE_FIREBASE_MEASUREMENT_ID ?? null;
  }

  toFirebaseConfig(): FirebaseConfig {
    return {
      apiKey: this.apiKey,
      authDomain: this.authDomain,
      databaseURL: this.databaseURL,
      projectId: this.projectId,
      storageBucket: this.storageBucket,
      messagingSenderId: this.messagingSenderId,
      appId: this.appId,
      measurementId: this.measurementId,
    };
  }

  toConfigObject(): ConfigObject {
    return {
      api_url: this.apiURL,
      firebase_config: this.toFirebaseConfig(),
      github_token: this.githubToken,
    };
  }
}
