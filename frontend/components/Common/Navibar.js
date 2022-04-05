import React, { useEffect, useState } from "react";
import { Container, Navbar, NavLink, NavDropdown } from "react-bootstrap";
import Login from '../Firebase/Login';
import styles from "../../styles/Common/Navibar.module.css";
import { bringUser } from "../../function/axios";
import Link from 'next/link'
import { useRouter } from 'next/router'

function Navibar() {
  const router = useRouter()
  const [LoginmodalShow, LoginsetModalShow] = React.useState(false);
  const onLogOutClick = () => {
    localStorage.removeItem('userUid');
    localStorage.removeItem('ally-supports-cache');
    localStorage.removeItem('token');
    localStorage.removeItem('campid');
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

  const onBoard = () => {
    router.push('/board')
  }
  const onSearch = () => {
    router.push('/search')
  }
  const onNews = () => {
    router.push('/news')
  }
  const onShopping = () => {
    router.push('/shopping')
  }
  const onMyPage = () => {
    router.push('/mypage')
  }

  return (
    <>
      <Navbar style={{backgroundColor: "white"}} expand="lg">
        <Container>
          <Navbar.Brand style={{cursor:'pointer'}}>
          <Link href="/">
            <img className={styles.navi_pic} src="../../logo.png" />
            </Link>
          </Navbar.Brand>
          <div>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" style={{ justifyContent: "right" }}>
                <NavLink onClick={onBoard}>
                  <p style={{ color: "black", fontWeight: "bold", width: "60px", marginTop: "20%" }}>BOARD</p>
                </NavLink>{" "}
              
                <p style={{ marginTop: "3%" }}>/</p>
              
                <NavLink onClick={onSearch}>
                  <p style={{ color: "black", fontWeight: "bold", width: "60px", marginTop: "22%" }}>SEARCH</p>
                </NavLink>{" "}
              
                <p style={{ marginTop: "3%" }}>/</p>
              
                <NavLink onClick={onNews}>
                  <p style={{ color: "black", fontWeight: "bold", width: "45px", marginTop: "30%" }}>NEWS</p>
                </NavLink>
              
                <p style={{ marginTop: "3%" }}>/</p>
              
                <NavLink onClick={onShopping}>
                  <p style={{ color: "black", fontWeight: "bold", width: "90px", marginTop: "20%" }}>SHOPPING</p>
                </NavLink>
                  {
                    
                    !token && (
                        <div>
                          <p style={{ color: "black", fontWeight: "bold", width: "135px", marginTop: "12%", cursor:'pointer' }} onClick={() => LoginsetModalShow(true)}>LOGIN & SIGNUP</p>
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
                              <NavDropdown.Item onClick={() => onMyPage()}>마이페이지</NavDropdown.Item>
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