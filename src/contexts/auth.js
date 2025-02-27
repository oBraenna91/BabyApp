import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (currentUser) => {
    if (currentUser) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', currentUser.id)
        .maybeSingle();
      if (!error && data) {
        setProfile(data);
      }
    }
  };

  useEffect(() => {
    // Hent nåværende session ved oppstart
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setUser(session?.user ?? null);
    //   setLoading(false);
    // });
    const getSessionAndProfile = async () => {
      // Hent nåværende session ved oppstart
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        // Hent profil fra din egen "users"-tabell
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', currentUser.id)
          .maybeSingle();
        if (!error && data) {
          setProfile(data);
        }
      }
      setLoading(false);
    };

    getSessionAndProfile();

    // Lytt til endringer i auth-status
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
