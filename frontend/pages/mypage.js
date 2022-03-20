import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import styles from "/styles/MyPage/MyPage.module.css";

function mypage() {

    const [selected, setSelected] = useState("1");

    return (
        
        <div>
            <Container style={{height: "1500px"}}>
                <Row>
                    <div className={styles.mypage_div1}>
                        <Col xs={2}>
                            <img className={styles.mypage_profile_pic} src="/profile.png" />
                        </Col>
                        <Col xs={10}>
                        
                        </Col>
                    </div>
                    
                </Row>
            </Container>
        </div>
    );
}

export default mypage;