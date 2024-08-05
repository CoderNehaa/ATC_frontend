// pages/auth/google/callback.tsx
import { useEffect } from 'react';
import useStore from '@/store/store';

const GoogleCallback = () => {
  const { setCurrentUser, setToken } = useStore();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const response = await fetch('http://localhost:3200/users/auth/google/callback', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to log in');
        }

        const data = await response.json();
        setCurrentUser(data.data);
        setToken(data.token);
        window.location.href = '/'; // Redirect to home page
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    };

    handleGoogleCallback();
  }, [setCurrentUser, setToken]);

  return <div>Loading...</div>; // Show loading state while processing
};

export default GoogleCallback;