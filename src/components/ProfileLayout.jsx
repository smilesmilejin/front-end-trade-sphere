import { Outlet } from 'react-router';
import AccountNavbar from './AccountNavbar';
import AccountHeader from './AccountHeader';

function ProfileLayout() {
  return (
    <div className="profile-container">
      <AccountHeader />
      <AccountNavbar />
      <div className="profile-card">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout;