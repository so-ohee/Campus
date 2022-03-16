import React, { useEffect, useState } from "react";
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
import { authService } from "firebase/compat/app";

function Navibar() {
  const [LoginmodalShow, LoginsetModalShow] = React.useState(false);
  const onLogOutClick = () => {
    // localStorage.removeItem(localStorage.token);
    localStorage.removeItem('token');
    console.log(localStorage);
    location.reload()
  }

  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  return (
    <>
      <Navbar style={{backgroundColor: "#007D0D"}} expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img className={styles.navi_pic} src="/logo.png" />
          </Navbar.Brand>
          <di>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" style={{justifyContent: "right"}}>
                <NavLink href="campingplace">
                  <h6 style={{ color: "white", fontWeight: "bold", width: "130px" }}>CAMPING PLACE</h6>
                </NavLink>{" "}
                /
                <NavLink href="board">
                  <h6 style={{ color: "white", fontWeight: "bold", width: "60px"  }}>BOARD</h6>
                </NavLink>{" "}
                /
                <NavLink href="qna">
                  <h6 style={{ color: "white", fontWeight: "bold", width: "80px"  }}>NEWS</h6>
                </NavLink>
                {/* <div className={styles.navi_dropdown}>
                  <NavDropdown align="end" title={
                    <img className={styles.navi_profile_pic} src="/profile.png" />
                  } id="dropdown-menu-align-end">
                    {
                      !token && (
                        <>
                          <NavDropdown.Item onClick={() => LoginsetModalShow(true)}>Login</NavDropdown.Item>
                          <Login
                            show={LoginmodalShow}
                            onHide={() => LoginsetModalShow(false)}
                          />
                        </>
                      ) 
                    }
                    {
                      token && (
                        <>
                          <NavDropdown.Item onClick={() => onLogOutClick()}>Logout</NavDropdown.Item>
                        </>
                      )
                    }
                    <NavDropdown.Item>My Profile</NavDropdown.Item>
                  </NavDropdown>
                </div> */}
                  {
                    !token && (
                        <>
                          <h6 style={{ color: "white", fontWeight: "bold", width: "135px" }} onClick={() => LoginsetModalShow(true)}>LOGIN & SIGNUP</h6>
                          <Login
                            show={LoginmodalShow}
                            onHide={() => LoginsetModalShow(false)}
                          />
                        </>
                    ) 
                  }
                  {
                    token && (
                      <div className={styles.navi_dropdown}>
                        <NavDropdown align="end" title={
                          <img className={styles.navi_profile_pic} src="/profile.png" />
                        } id="dropdown-menu-align-end">
                          <NavDropdown.Item>마이페이지</NavDropdown.Item>
                          <NavDropdown.Item>정보 수정</NavDropdown.Item>
                          <NavDropdown.Item onClick={() => onLogOutClick()}>로그아웃</NavDropdown.Item>
                        </NavDropdown>
                      </div> 
                    )
                  }
            </Navbar.Collapse>  
          </di>
        </Container>
      </Navbar>
    </>
  );
}
export default Navibar;