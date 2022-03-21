import React from "react";
import { Container, Navbar, NavLink, NavDropdown } from "react-bootstrap";
import Login from '../Firebase/Login';
import styles from "/styles/Common/Navibar.module.css";

function Navibar() {
  const [LoginmodalShow, LoginsetModalShow] = React.useState(false);
  const onLogOutClick = () => {
    // localStorage.removeItem(localStorage.token);
    localStorage.removeItem('photoURL');
    localStorage.removeItem('ally-supports-cache');
    localStorage.removeItem('token');
    console.log(localStorage);
    // location.reload();
    document.location.href = "/";
  }

  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  return (
    <>
      <Navbar style={{backgroundColor: "white"}} expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img className={styles.navi_pic} src="/logo.png" />
          </Navbar.Brand>
          <div>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" style={{justifyContent: "right"}}>
                <NavLink href="campingplace">
                  <h6 style={{ color: "black", fontWeight: "bold", width: "130px" }}>CAMPING PLACE</h6>
                </NavLink>{" "}
                /
                <NavLink href="board">
                  <h6 style={{ color: "black", fontWeight: "bold", width: "60px"  }}>BOARD</h6>
                </NavLink>{" "}
                /
                <NavLink href="search">
                  <h6 style={{ color: "black", fontWeight: "bold", width: "60px"  }}>SEARCH</h6>
                </NavLink>{" "}
                /
                <NavLink href="news">
                  <h6 style={{ color: "black", fontWeight: "bold", width: "80px"  }}>NEWS</h6>
                </NavLink>
                  {
                    !token && (
                        <div>
                          <h6 style={{ color: "black", fontWeight: "bold", width: "135px" }} onClick={() => LoginsetModalShow(true)}>LOGIN & SIGNUP</h6>
                          <Login
                            show={LoginmodalShow}
                            onHide={() => LoginsetModalShow(false)}
                          />
                        </div>
                    ) 
                  }
                  {
                    token && (
                        <div className={styles.navi_dropdown}>
                            <NavDropdown align="end" title={
                              <img className={styles.navi_profile_pic} src="/profile.png" />
                            } id="dropdown-menu-align-end">
                              <NavDropdown.Item href="mypage">마이페이지</NavDropdown.Item>
                              <NavDropdown.Item>정보 수정</NavDropdown.Item>
                              <NavDropdown.Item onClick={() => onLogOutClick()}>로그아웃</NavDropdown.Item>
                            </NavDropdown>
                        </div> 
                    )
                  }
            </Navbar.Collapse>  
          </div>
        </Container>
      </Navbar>
    </>
  );
}
export default Navibar;