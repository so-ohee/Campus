import { Navbar } from "react-bootstrap";

function Footer() {
  return (
    <div className="pt-5">
      <Navbar
        bg="success"
        variant="dark"
        fixed="bottom"
        className="justify-content-center"
      >
        <Navbar.Brand>Copyrightⓒ 2022 Campus All rights reserved.</Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default Footer;
