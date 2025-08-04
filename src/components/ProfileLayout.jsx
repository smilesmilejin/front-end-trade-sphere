import { Outlet } from 'react-router';
import AccountNavbar from './AccountNavbar';
import AccountHeader from './AccountHeader';
import '../styles/ProfileLayout.css';


function ProfileLayout() {
  return (
    <div className="profile-container">
      <AccountHeader />
      <div className="profile-layout">
        <AccountNavbar />
        <div className="profile-card">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;