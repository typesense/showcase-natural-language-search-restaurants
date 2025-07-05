import { useEffect, useState } from 'react';

export default function getUserLocation() {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);

          setLocation([position.coords.latitude, position.coords.longitude]);
        });
      } else if (result.state === 'prompt') {
        // still ask the user
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation([position.coords.latitude, position.coords.longitude]);
          },
          (err) => setError(err.message)
        );
      } else {
        setError('Permission denied');
      }
    });
  }, []);

  return { location, error };
}
