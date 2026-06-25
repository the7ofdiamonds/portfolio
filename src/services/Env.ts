import type { ConfigObject, FirebaseConfig } from './Config';

export class Env {
  apiURL: string | null;
  githubToken: string | null;
  gitlabURL: string | null;
  gitlabToken: string | null;
  apiKey: string | null;
  authDomain: string | null;
  databaseURL: string | null;
  projectId: string | null;
  storageBucket: string | null;
  messagingSenderId: string | null;
  appId: string | null;
  measurementId: string | null;

  constructor(env: ImportMetaEnv) {
    this.apiURL = env.DEV
      ? env.VITE_DEV_API_URL
      : env.VITE_API_URL
        ? env.VITE_API_URL
        : null;
    this.githubToken = env.VITE_GITHUB_TOKEN ?? null;
    this.gitlabURL = env.VITE_GITLAB_API ?? null;
    this.gitlabToken = env.VITE_GITLAB_TOKEN ?? null;
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
      gitlab_url: this.gitlabURL,
      gitlab_token: this.gitlabToken
    };
  }
}
