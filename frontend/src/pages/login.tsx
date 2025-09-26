
import { useState } from 'react';
import { TextField, Button, Alert, Typography, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const backendUrl = 'http://localhost:4000';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const resp = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (resp.ok) {
      navigate('/dashboard');
    } else {
      const data = await resp.json().catch(() => ({}));
      setError(data.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm rounded-xl border bg-white p-6 text-center space-y-4">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <form className="flex flex-col gap-5 text-left" onSubmit={handleLogin}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        <Typography className="my-2 text-gray-500" variant="body2">or</Typography>
        <Button variant="contained" color="secondary" fullWidth onClick={() => {
          window.location.href = `${backendUrl}/auth/google`;
        }}>
          Continue with Google
        </Button>
        <div className="pt-2 text-sm">
          <MuiLink component={Link} to="/signup" underline="hover">
            Don&apos;t have an account? Sign up
          </MuiLink>
        </div>
      </div>
    </div>
  );
}
