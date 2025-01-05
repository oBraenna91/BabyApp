import React, { useEffect, useState } from 'react';
import { useIonRouter } from '@ionic/react';
import { supabase } from './supabaseClient.js';

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useIonRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data?.session || null);
      setLoading(false);
    };

    fetchSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!session) {
    router.push('/login', 'forward'); 
    return null;
  }

  return <>{children}</>;
}