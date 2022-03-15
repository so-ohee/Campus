import Navbar from "/components/layout/Navbar";
import Footer from "/components/layout/Footer";
import Jumbotron from "/components/layout/Jumbotron";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Jumbotron />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
