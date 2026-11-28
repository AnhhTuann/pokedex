import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { useAuthStore } from '../lib/authStore';
import styles from '../styles/pages/Account.module.scss';
import { Button } from '../components/common/Button';
import { InputField } from '../components/common/InputField';
import { CircleDot } from 'lucide-react';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION);
  const setAuth = useAuthStore(state => state.setAuth);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const { data } = await loginMutation({
        variables: { username, password }
      });
      if (data?.login) {
        setAuth(data.login.token, data.login.user);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed');
    }
  };

  return (
    <div className={styles.authPage}>
      <section className={styles.authPanel} aria-labelledby="account-title">
        <header className={styles.authHeader}>
          <div className={styles.accountMark} aria-hidden="true"><CircleDot size={26} /></div>
          <h1 id="account-title">Sign in</h1>
          <p>Open your trainer profile.</p>
        </header>

        {errorMsg && <p className={styles.error} role="alert">{errorMsg}</p>}

        <form onSubmit={handleLogin} className={styles.form} aria-busy={loading}>
          <InputField label="Username" name="username" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} required />
          <InputField label="Password" name="password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required />
          <Button type="submit" size="lg" isLoading={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <p className={styles.authFooter}>New to Elite Pokédex? <Link to="/register">Create an account</Link></p>
      </section>
    </div>
  );
}
