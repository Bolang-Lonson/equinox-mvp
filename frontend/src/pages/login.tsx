import Button from '@mui/material/Button';

export default function LoginPage() {
  const backendUrl = 'http://localhost:4000';
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm rounded-xl border bg-white p-6 text-center space-y-4">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-gray-600">Use your Google account to continue.</p>
        <Button variant="contained" color="primary" fullWidth onClick={() => {
          window.location.href = `${backendUrl}/auth/google`;
        }}>
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
