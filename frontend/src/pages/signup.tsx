import { useState } from 'react';
import { TextField, Button, Card, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    const resp = await fetch('http://localhost:4000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, name, password }),
    });
    if (resp.ok) {
      setSuccess(true);
      navigate('/login');
    } else {
      const data = await resp.json().catch(() => ({}));
      setError(data.error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-sm p-6 space-y-4">
        <Typography variant="h5" className="text-center">Sign up</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Signup successful! You can now log in.</Alert>}
        <form className="space-y-4" onSubmit={handleSignup}>
          <TextField
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            required
          />
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
          <Button type="submit" variant="contained" color="primary" fullWidth>Sign up</Button>
        </form>
      </Card>
    </div>
  );
}
