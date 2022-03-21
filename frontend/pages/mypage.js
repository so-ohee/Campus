import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import styles from "/styles/MyPage/MyPage.module.css";
import VisitedCamp from '/components/MyPage/VisitedCamp.js';
import ReviewCamp from '/components/MyPage/ReviewCamp.js';
import Bookmarkcamp from '/components/MyPage/Bookmarkcamp.js';
import { bringUser } from "../function/axios";

function mypage() {
    const [data, setData] = useState("");
    const [user, setUser] = useState([]);

    useEffect(() => {
        bringUser(localStorage.getItem("userUid")).then((res) => setData(res.data.user));
    }, [])

    return (
        <div>
            <Container style={{ height: "1300px" }}>
                <div className={styles.mypage_div1}>
                    <Row>
                        <Col xs={2}>
                            <img className={styles.mypage_profile_pic} src={ `${data.profile}` } />
                        </Col>
                        <Col xs={10} style={{alignSelf: "center"}}>
                            <h2 style={{ fontWeight: "bold" }}>{ data.name }</h2>
                        </Col>
                    </Row>
                </div>

                <div className={styles.mypage_div2}>
                    <Tabs style={{width: "1320px"}} defaultActiveKey="Visited" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="Visited" title="Visited">
                            <VisitedCamp />
                        </Tab>
                        <Tab eventKey="Review" title="Review">
                            <ReviewCamp />
                        </Tab>
                        <Tab eventKey="Bookmark" title="Bookmark">
                            <Bookmarkcamp />
                        </Tab>
                    </Tabs>
                </div>
            </Container>
        </div>
    );
}

export default mypage;