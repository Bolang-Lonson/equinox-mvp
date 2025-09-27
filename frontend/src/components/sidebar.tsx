import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import EventIcon from '@mui/icons-material/Event';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { NavLink } from 'react-router-dom';

import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: <DashboardIcon fontSize="small" /> },
  { to: '/dashboard/portfolio', label: 'Portfolio', icon: <FolderIcon fontSize="small" /> },
  { to: '/dashboard/docketing', label: 'Docketing', icon: <EventIcon fontSize="small" /> },
  { to: '/dashboard/renewals', label: 'Renewals', icon: <ReceiptLongIcon fontSize="small" /> },
  { to: '/dashboard/monitoring', label: 'Monitoring', icon: <SearchIcon fontSize="small" /> },
  { to: '/dashboard/documents', label: 'Documents', icon: <DescriptionIcon fontSize="small" /> },
  { to: '/dashboard/reporting', label: 'Reporting', icon: <AssessmentIcon fontSize="small" /> },
  { to: '/dashboard/profile', label: 'Profile', icon: <PersonIcon fontSize="small" /> },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 hidden md:block shrink-0 border-r bg-white">
      <div className="px-4 py-4 border-b">
        <span className="text-lg font-semibold">TM/IP Manager</span>
      </div>
      <List disablePadding>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'}`
            }
            end={item.to === '/dashboard'}
          >
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 32 }}>{item.icon}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary={item.label} />
            </ListItemButton>
          </NavLink>
        ))}
      </List>
      <Divider />
      <NavLink
        to="#"
        onClick={async (e) => {
          e.preventDefault();
          await fetch('http://localhost:4000/auth/logout', {
            method: 'POST',
            credentials: 'include',
          });
          window.location.href = '/login';
        }}
        className="block text-gray-700 hover:bg-red-50"
      >
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: 32 }}><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: 14 }} primary="Logout" />
        </ListItemButton>
      </NavLink>
      <div className="px-4 py-3 text-xs text-gray-500">
        <p>Roles: partner, attorney, paralegal</p>
      </div>
    </aside>
  );
}
