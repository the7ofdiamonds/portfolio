import { Env } from '@/services/Env';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';

import { getFirestore, Firestore } from 'firebase/firestore';

export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

export type ConfigObject = {
  api_url: string;
  firebase_config: FirebaseConfig;
  github_token: string;
};

export class Config {
  apiURL: string | null;
  app: FirebaseApp | null;
  db: Firestore | null;
  auth: Auth | null;
  githubToken: string | null;

  constructor(config: ConfigObject) {
    this.apiURL = config.api_url ? config.api_url : null;
    this.app = config.firebase_config
      ? this.initFirebase(config.firebase_config)
      : null;
    this.db = this.app ? getFirestore(this.app) : null;
    this.auth = this.app ? getAuth(this.app) : null;
    this.githubToken = config.github_token ? config.github_token : null;
  }

  initFirebase(config: FirebaseConfig): FirebaseApp {
    try {
      if (!this.app) {
        return (this.app = initializeApp(config));
      }
      return this.app;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getFirebaseApp(): FirebaseApp | null {
    try {
      if (!this.app) {
        throw new Error('Firebase has not been initialized.');
      }

      return this.app;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  setAPI = (apiURL: string) => {
    this.apiURL = apiURL;
  };
}

let configInstance: Config | null = null;

export const setConfig = (config: ConfigObject): Config => {
  if (!configInstance) {
    configInstance = new Config(config);
  }

  return configInstance;
};

export const getConfig = (): Config | null => {
  try {
    if (!configInstance) {
      throw new Error('Config not set. Call setConfig(config) first.');
    }
    return configInstance;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAPI = () => {
  let config = getConfig();
  if (config) {
    return config.apiURL;
  }
  return null;
};

export const getDB = () => {
  let config = getConfig();
  if (config) {
    return config.db;
  }
  return null;
};

export const getAuthorization = () => {
  let config = getConfig();
  if (config) {
    return config.auth;
  }
  return null;
};

export const getToken = () => {
  let config = getConfig();
  if (config) {
    return config.githubToken;
  }
  return null;
};

export const setEnvVariables = (env: ImportMetaEnv) => {
  try {
      console.log('init config')

    const envVars = new Env(env);

    return setConfig(envVars.toConfigObject());
  } catch (error) {
    console.error(error);
  }
};
