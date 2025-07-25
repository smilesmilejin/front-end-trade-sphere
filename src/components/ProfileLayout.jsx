import { Outlet } from 'react-router';
import AccountNavbar from './AccountNavbar';

function ProfileLayout() {
  return (
    <div className="profile-container">
      <AccountNavbar />
      <div className="profile-card">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout;