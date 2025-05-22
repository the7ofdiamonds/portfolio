import { getLocation } from './Location';

import { Coordinates } from '@/model/Coordinates';
import { SecureHeaders } from '@/model/SecureHeaders';

export const addHeaders = async () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('User-Agent', navigator.userAgent);

  const coordinates: Coordinates = await getLocation();
  headers.append('X-Longitude', coordinates.longitude.toString());
  headers.append('X-Latitude', coordinates.latitude.toString());

  return headers;
};

export const checkHeaders = (): Boolean => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken && !refreshToken) {
      return false;
    }

    return true;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Error in addSecureHeaders: ${err.message}`);
  }
};

export const addSecureHeaders = async (): Promise<SecureHeaders> => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    const headers = new SecureHeaders(
      accessToken,
      refreshToken,
      'application/json',
      navigator.userAgent
    );

    if (headers.errorMessage) {
      throw new Error(headers.errorMessage);
    }

    return headers;
  } catch (error) {
    const err = error as Error;
    throw new Error(`Error in addSecureHeaders: ${err.message}`);
  }
};
