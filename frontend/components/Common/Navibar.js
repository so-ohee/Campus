import React, { useEffect, useState } from "react";
import { Container, Navbar, NavLink, NavDropdown } from "react-bootstrap";
import Login from '../Firebase/Login';
import styles from "../../styles/Common/Navibar.module.css";
import { bringUser } from "../../function/axios";

function Navibar() {
  const [LoginmodalShow, LoginsetModalShow] = React.useState(false);
  const onLogOutClick = () => {
    localStorage.removeItem('userUid');
    localStorage.removeItem('ally-supports-cache');
    localStorage.removeItem('token');
    console.log(localStorage);
    document.location.href = "/";
  }

  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const [data, setData] = useState("");

    useEffect(() => {
        bringUser(localStorage.getItem("userUid")).then((res) => setData(res.data.user));
    }, [])
  
  return (
    <>
      <Navbar style={{backgroundColor: "white"}} expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img className={styles.navi_pic} src="../../logo.png" />
            {/* <img className={styles.navi_pic} src={process.env.NEXT_PUBLIC + "/logo.png" } /> */}
          </Navbar.Brand>
          <div>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" style={{ justifyContent: "right" }}>
                <NavLink href="board">
                  <p style={{ color: "black", fontWeight: "bold", width: "60px", marginTop: "20%" }}>BOARD</p>
                </NavLink>{" "}
              
                <p style={{ marginTop: "3%" }}>/</p>
              
                <NavLink href="search">
                  <p style={{ color: "black", fontWeight: "bold", width: "60px", marginTop: "22%" }}>SEARCH</p>
                </NavLink>{" "}
              
                <p style={{ marginTop: "3%" }}>/</p>
              
                <NavLink href="news">
                  <p style={{ color: "black", fontWeight: "bold", width: "45px", marginTop: "30%" }}>NEWS</p>
                </NavLink>
              
                <p style={{ marginTop: "3%" }}>/</p>
              
                <NavLink href="shopping">
                  <p style={{ color: "black", fontWeight: "bold", width: "70px", marginTop: "20%" }}>SHOPPING</p>
                </NavLink>
                  {
                    
                    !token && (
                        <div>
                          <p style={{ color: "black", fontWeight: "bold", width: "135px" }} onClick={() => LoginsetModalShow(true)}>LOGIN & SIGNUP</p>
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
                              <img className={styles.navi_profile_pic} src={ `${data.profile}` } />
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