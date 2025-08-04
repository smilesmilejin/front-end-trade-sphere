import UserLogo from '../assets/UserLogo.png';
import '../styles/AccountHeader.css';

function AccountHeader() {


    return (
        <header className="account-header">
            <img className="account-header-logo" src={UserLogo} alt="User Logo" />
            <p className="welcome-message">Welcome back to your account dashboard!</p>
        </header>

  );


}

export default AccountHeader; 