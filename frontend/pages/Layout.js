import Navibar from "/components/Common/Navibar";
import Footer from "/components/Common/Footer";
import Jumbotron from "/components/Common/Jumbotron";

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
