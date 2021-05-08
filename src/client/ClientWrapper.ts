/* eslint-disable class-methods-use-this */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface SNWindowContext extends Window {
  g_ck?: string;
}

export const getAuthClient = (
  username: string,
  password: string,
  instanceURL: string,
  config?: AxiosRequestConfig,
): AxiosInstance => {
  if (username === '' || password === '' || instanceURL === '') {
    throw new Error(
      'The auth information in your .env file is not complete. Please verify that it matches a valid sincronia .env file.',
    );
  }
  return axios.create({
    ...config,
    auth: {
      username,
      password,
    },
    baseURL: `https://${instanceURL}`,
  });
};

export const getDefaultAuthClient = (): AxiosInstance => {
  const username = process.env.REACT_APP_SN_USER ?? '';
  const password = process.env.REACT_APP_SN_PASSWORD ?? '';
  const instanceURL = process.env.REACT_APP_SN_INSTANCE ?? '';
  return getAuthClient(username, password, instanceURL);
};

class ClientWrapper {
  private client: AxiosInstance | null;

  constructor() {
    this.client = null;
  }

  resolve(): AxiosInstance {
    return getDefaultAuthClient();
  }

  getClient(): AxiosInstance {
    if (!this.client) {
      this.client = this.resolve();
    }
    return this.client;
  }

  setClient(client: AxiosInstance): void {
    this.client = client;
  }
}

const clientWrapper = new ClientWrapper();

const getClient = (): AxiosInstance => {
  return clientWrapper.getClient();
};

const getNewClient = (): AxiosInstance => {
  return clientWrapper.resolve();
};
export { getClient, getNewClient };
