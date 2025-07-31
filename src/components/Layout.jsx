import { Outlet } from "react-router";
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import NavBar from './NavBar.jsx';

const Layout = () => {
  return (
    <div>
      <Header />
      <NavBar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;