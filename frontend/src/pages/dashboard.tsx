import Sidebar from "../components/sidebar";
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await fetch('http://localhost:4000/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="flex justify-end items-center gap-4 p-4">
          <span>{user?.name}</span>
          <Button
            variant="outlined"
            color="secondary"
            className="!normal-case"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        <div className="p-6 pt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}