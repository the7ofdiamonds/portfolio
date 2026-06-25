import type { FirebaseApp } from 'firebase/app';
import { initializeApp } from 'firebase/app';

import type { Auth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

import type{ Firestore } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

import { Env } from '../services/Env';

export type FirebaseConfig = {
  apiKey: string | null;
  authDomain: string | null;
  databaseURL: string | null;
  projectId: string | null;
  storageBucket: string | null;
  messagingSenderId: string | null;
  appId: string | null;
  measurementId: string | null;
};

export type ConfigObject = {
  api_url: string | null;
  firebase_config: FirebaseConfig;
  github_token: string | null;
  gitlab_url: string | null;
  gitlab_token: string | null;
};

export class Config {
  apiURL: string | null;
  app: FirebaseApp | null;
  db: Firestore | null;
  auth: Auth | null;
  githubToken: string | null;
  gitlabToken: string | null;
  gitlabURL: string | null;

  constructor(config: ConfigObject) {
    this.apiURL = config?.api_url ? config.api_url : null;
    this.app = config?.firebase_config
      ? this.initFirebase(config.firebase_config)
      : null;
    this.db = this.app ? getFirestore(this.app) : null;
    this.auth = this.app ? getAuth(this.app) : null;
    this.githubToken = config?.github_token ? config.github_token : null;
    this.gitlabToken = config?.gitlab_token ? config.gitlab_token : null;
    this.gitlabURL = config?.gitlab_url ? config.gitlab_url : null;
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

  setGitLabURL = (gitlabURL: string) => {
    this.gitlabURL = gitlabURL;
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
  if (config && config.apiURL) {
    return config.apiURL;
  }
  return null;
};

export const getDB = () => {
  let config = getConfig();
  if (config && config.db) {
    return config.db;
  }
  return null;
};

export const getAuthorization = () => {
  let config = getConfig();
  if (config && config.auth) {
    return config.auth;
  }
  return null;
};

export const getGithubToken = () => {
  let config = getConfig();
  if (config && config.githubToken) {
    return config.githubToken;
  }
  return null;
};

export const getGitlabToken = () => {
  let config = getConfig();
  if (config && config.gitlabToken) {
    return config.gitlabToken;
  }
  return null;
};

export const setEnvVariables = (env: ImportMetaEnv) => {
  try {
    const envVars = new Env(env);

    return setConfig(envVars.toConfigObject());
  } catch (error) {
    console.error(error);
  }
};
