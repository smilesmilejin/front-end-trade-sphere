// import { Outlet } from 'react-router-dom';
import { Outlet } from "react-router";
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Layout = () => {
  return (
    <div>
      <Header />

      {/* Render the nested route components here */}
      <main>
        <Outlet />
      </main>
      {/* <Outlet /> */}

      <Footer />
    </div>
  );
};

export default Layout;

// import { Outlet } from "react-router";

// export default function Layout() {
//   return (
//     <div>
//       <h1>Parent Content</h1>
//       <Outlet />
//     </div>
//   );
// }