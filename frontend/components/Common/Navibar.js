import React from "react";
import {
  Nav,
  Container,
  Form,
  FormControl,
  Navbar,
  Row,
  Col,
  NavLink,
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

          <Row>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" style={{justifyContent: "right"}}>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <img className={styles.navi_search_pic} src="/search.png" />
              </Form>
                <NavLink href="#action1">
                  <a style={{ color: "white", fontWeight: "bold" }}>ABOUT US</a>
                </NavLink>{" "}
                /
                <NavLink href="#action2">
                  <a style={{ color: "white", fontWeight: "bold" }}>CAMPING PLACE</a>
                </NavLink>{" "}
                /
                <NavLink href="#action3">
                  <a style={{ color: "white", fontWeight: "bold" }}>BOARD</a>
                </NavLink>
                <img className={styles.navi_bell_pic} src="/bell.png" />
                <img className={styles.navi_profile_pic} src="/profile.png" />
            </Navbar.Collapse>  
          </Row>
        </Container>
      </Navbar>
    </>
  );
}

export default Navibar;
