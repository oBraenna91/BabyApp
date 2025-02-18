import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient.js';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signUpUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setMessage('');
    //eslint-disable-next-line
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
  
    if (error) {
      setIsLoading(false);
      setErrorMsg(error.message);
    } else {
          setIsLoading(false);
          setMessage('Check your e-mail to verify your account!');
        }
      }

  return (
    <form className="test-form col-10 m-auto" onSubmit={signUpUser}>
      {isLoading && <p>Loading...</p>}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <div className="label-input-container">
        <label className="label">E-mail</label>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
          placeholder="E-mail"
        />
      </div>
      <div className="label-input-container">
        <label className="label">Password</label>
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-input"
          placeholder="Password"
        />
      </div>
      <button className="submit-button" type="submit">Create account</button>
    </form>
  );
}
