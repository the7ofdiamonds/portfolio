import { Coordinates } from '@/model/Coordinates';

export function getLocation(): Promise<Coordinates> {
  try {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const coordinates = new Coordinates(
              position.coords.longitude,
              position.coords.latitude
            );

            resolve(coordinates);
          },
          function (error: GeolocationPositionError) {
            showError(error);
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported'));
      }
    });
  } catch (error) {
    const err = error as Error;
    console.error(err.message);
    throw new Error(err.message);
  }
}

function showError(error: GeolocationPositionError) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log('User denied the request for Geolocation.');
      break;
    case error.POSITION_UNAVAILABLE:
      console.log('Location information is unavailable.');
      break;
    case error.TIMEOUT:
      console.log('The request to get user location timed out.');
      break;
    default:
      console.log('An unknown error occurred.');
      break;
  }
}
