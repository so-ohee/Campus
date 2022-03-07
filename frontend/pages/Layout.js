import Navibar from "/components/common/Navibar";
import Footer from "/components/common/Footer";
import Jumbotron from "/components/common/Jumbotron";

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
