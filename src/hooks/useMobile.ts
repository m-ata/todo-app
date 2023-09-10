import { useEffect, useState } from 'react';

/**
 * Custom useMobile hook to determine if the application is running on a mobile device.
 * @returns {boolean} A boolean value indicating if the application is running on a mobile device.
 */
export const useMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.matchMedia('(max-width: 767px)').matches,
  );

  useEffect(() => {
    // media query to detect changes in screen width
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    // callback function to handle changes in the media query.
    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);

    // cleanup event listener when the component unmounts.
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return isMobile;
};
