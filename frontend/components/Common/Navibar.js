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
  NavDropdown, 
  Modal,
  Button,
} from "react-bootstrap";
import Login from '../Firebase/Login';
import styles from "/styles/Common/Navibar.module.css";

function Navibar() {
  const [LoginmodalShow, LoginsetModalShow] = React.useState(false);

  return (
    <>
      <Navbar bg="success" expand="lg">
        <Container>
          <Navbar.Brand href="#">
            <img className={styles.navi_pic} src="/logo.png" />
          </Navbar.Brand>
          <di>
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
                  <h6 style={{ color: "white", fontWeight: "bold", width: "130px" }}>CAMPING PLACE</h6>
                </NavLink>{" "}
                /
                <NavLink href="#action2">
                  <h6 style={{ color: "white", fontWeight: "bold", width: "60px"  }}>BOARD</h6>
                </NavLink>{" "}
                /
                <NavLink href="#action3">
                  <h6 style={{ color: "white", fontWeight: "bold", width: "80px"  }}>RENT SITE</h6>
                </NavLink>
                <img className={styles.navi_bell_pic} src="/bell.png" />
                <div className={styles.navi_dropdown}>
                <NavDropdown align="end" title={
                  <img className={styles.navi_profile_pic} src="/profile.png" />
                } id="dropdown-menu-align-end">
                  <NavDropdown.Item onClick={() => LoginsetModalShow(true)}>Login</NavDropdown.Item>
                  <Login
                    show={LoginmodalShow}
                    onHide={() => LoginsetModalShow(false)}
                  />
                  <NavDropdown.Item>My Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>Logout</NavDropdown.Item>
                </NavDropdown>
              </div>
            </Navbar.Collapse>  
          </di>
        </Container>
      </Navbar>
    </>
  );
}

// function MyVerticallyCenteredModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Modal heading
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Centered Modal</h4>
//         <p>
//           Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//           dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//           consectetur ac, vestibulum at eros.
//         </p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

export default Navibar;
