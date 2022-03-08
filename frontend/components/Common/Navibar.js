import React from "react";
import {
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Navbar,
  Button,
} from "react-bootstrap";
import styles from "/styles/Navibar.module.css";

function Navibar() {
  return (
    <>
      <Navbar bg="success" expand="lg">
        <Container>
          <Navbar.Brand href="#">
            <img className={styles.navi_pic} src="/logo.png" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <div>
            <Navbar.Collapse id="navbarScroll">
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <img className={styles.navi_search_pic} src="/search.png" />
              </Form>
              <Nav className={styles.navi_menu} navbarScroll>
                <Nav.Link href="#action1">
                  <a style={{ color: "white" }}>ABOUT US</a>
                </Nav.Link>{" "}
                /
                <Nav.Link href="#action2">
                  <a style={{ color: "white" }}>CAMPING PLACE</a>
                </Nav.Link>{" "}
                /
                <Nav.Link href="#action3">
                  <a style={{ color: "white" }}>BOARD</a>
                </Nav.Link>
                <Nav.Link href="#action3">
                  <img className={styles.navi_bell_pic} src="/bell.png" />
                </Nav.Link>
                <Nav.Link href="#action3">
                  <img className={styles.navi_profile_pic} src="/profile.png" />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Navibar;
