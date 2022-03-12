import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./NavBar";

const Layout = ({ children}) => {

  return (
    <div className="layout">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
