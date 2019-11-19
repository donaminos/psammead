import { useState, useEffect } from 'react';

const useMediaQuery = query => {
  const isClient = typeof window === 'object';

  const mediaMatch = isClient ? window.matchMedia(query) : undefined;
  const mediaMatches = isClient ? mediaMatch.matches : undefined;

  const [matches, setMatches] = useState(mediaMatches);

  useEffect(() => {
    if (!isClient) {
      return null;
    }

    const handler = e => setMatches(e.matches);

    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  return matches;
};

export default useMediaQuery;
