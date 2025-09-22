import { useAuth } from '../hooks/useAuth';
import { Button, Card, Avatar, Typography, CircularProgress } from '@mui/material';

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center mt-10">
        <Typography variant="h6">Not logged in</Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <Card className="p-8 flex flex-col items-center w-full max-w-md shadow-lg">
        <Avatar src={user.avatar_url} alt={user.name} sx={{ width: 80, height: 80, mb: 2 }} />
        <Typography variant="h5" className="mb-2">{user.name}</Typography>
        <Typography variant="body1" className="mb-4">{user.email}</Typography>
        <Button
          variant="contained"
          color="secondary"
          className="w-full"
          onClick={async () => {
            await fetch('http://localhost:4000/auth/logout', {
              method: 'POST',
              credentials: 'include',
            });
            window.location.href = '/login';
          }}
        >
          Logout
        </Button>
      </Card>
    </div>
  );
}
