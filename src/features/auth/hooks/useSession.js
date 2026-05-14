import { useEffect, useState } from 'react';
import { getCurrentSession, onAuthStateChange } from '../services/authService.js';

export default function useSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getCurrentSession().then((current) => {
      if (!mounted) return;
      setSession(current);
      setLoading(false);
    });
    const subscription = onAuthStateChange((nextSession) => setSession(nextSession));
    return () => {
      mounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  return { session, loading };
}
