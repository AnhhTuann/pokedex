import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { useAuthStore } from '../lib/authStore';
import styles from '../styles/pages/Account.module.scss';
import { Button } from '../components/common/Button';
import { InputField } from '../components/common/InputField';
import { CircleDot } from 'lucide-react';

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [registerMutation, { loading }] = useMutation(REGISTER_MUTATION);
  const setAuth = useAuthStore(state => state.setAuth);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const { data } = await registerMutation({
        variables: { username, email, password }
      });
      if (data?.register) {
        setAuth(data.register.token, data.register.user);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed');
    }
  };

  return (
    <div className={styles.authPage}>
      <section className={styles.authPanel} aria-labelledby="account-title">
        <header className={styles.authHeader}>
          <div className={styles.accountMark} aria-hidden="true"><CircleDot size={26} /></div>
          <h1 id="account-title">Create your account</h1>
          <p>Set up your trainer profile with an email and password.</p>
        </header>

        {errorMsg && <p className={styles.error} role="alert">{errorMsg}</p>}

        <form onSubmit={handleRegister} className={styles.form} aria-busy={loading}>
          <InputField label="Username" name="username" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} required />
          <InputField label="Email" name="email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <InputField label="Password" name="password" type="password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} required />
          <Button type="submit" size="lg" isLoading={loading}>
            {loading ? 'Creating account…' : 'Create your account'}
          </Button>
        </form>

        <p className={styles.authFooter}>Already have an account? <Link to="/login">Sign in</Link></p>
      </section>
    </div>
  );
}
