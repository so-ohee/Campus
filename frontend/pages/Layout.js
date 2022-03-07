import Navibar from "/components/layout/Navibar";
import Footer from "/components/layout/Footer";
import Jumbotron from "/components/layout/Jumbotron";

function Layout({ children }) {
  return (
    <>
      <Navibar />
      <Jumbotron />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
