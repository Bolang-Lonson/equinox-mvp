import { useEffect, useState } from 'react';

export type AuthUser = {
  id: number;
  email: string;
  name?: string;
  avatar_url?: string;
} | null;

export function useAuth() {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMe() {
      try {
        const resp = await fetch('http://localhost:4000/auth/me', {
          credentials: 'include',
        });
        const data = await resp.json();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMe();
  }, []);

  return { user, loading };
}
