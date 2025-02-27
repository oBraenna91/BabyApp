import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient.js';
import { useIonRouter } from '@ionic/react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useIonRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    //eslint-disable-next-line
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }
    router.push('/', 'forward');
  }

  

  return (
    <div className="login-container">
      <form className="test-form" onSubmit={handleLogin}>
        <div className="label-input-container">
          <label className="label">E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
            placeholder="Email"
          />
        </div>
        <div className="label-input-container">
          <label className="label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
            placeholder="Password"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  );
}



//   const { data: { user }, error: userError } = await supabase.auth.getUser();
  //   if (userError || !user) {
  //     setError('Feil ved henting av bruker.');
  //     setLoading(false);
  //     return;
  //   }

  //   const { data: profile, error: profileError } = await supabase
  //     .from('users')
  //     .select('*')
  //     .eq('id', user.id)
  //     .single();

  //   if (profileError || !profile) {
  //     alert('Please complete your profile before proceeding.');
  //     router.push('/setup-user', 'forward');
  //   } else {
  //     alert('You are now logged in!');
  //     router.push('/app', 'forward');
  //   }
  //   setLoading(false);
  // };