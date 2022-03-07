import Navbar from "/components/layout/Navbar";
import Footer from "/components/layout/Footer";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
