import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import styles from "/styles/Board/DetailReview.module.css";

function detailreview(props) {

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };
    const submitSign = () => {
        props.propFunction("수정")
    }
    
    return (
        <div>
            <Container>
                <h1 className={styles.detailreview_h1}>캠핑장 상세보기</h1>
                <div className={styles.detailreview_div}>
                    <Row>
                        <Col xs={9}>
                            <Row>
                                <h3 style={{fontWeight: "bold"}}>달천공원오토캠핑장</h3>
                            </Row>
                            <Row style={{width: "300px", marginTop: "1%"}}>
                                <Col xs={4}>
                                    <h6 style={{fontWeight: "bold", marginTop: "2%"}}>서비스</h6>
                                </Col>
                                <Col xs={1}>
                                    <h6 style={{fontWeight: "bold", marginTop: "2%"}}>4</h6>
                                </Col>
                                <Col xs={7}>
                                    <img src="/star.png" style={{width: "70%"}}></img>
                                </Col>
                            </Row>
                            <Row style={{width: "300px"}}>
                                <Col xs={4}>
                                    <h6 style={{fontWeight: "bold", marginTop: "2%"}}>환경</h6>
                                </Col>
                                <Col xs={1}>
                                    <h6 style={{fontWeight: "bold", marginTop: "2%"}}>4</h6>
                                </Col>
                                <Col xs={7}>
                                    <img src="/star.png" style={{width: "70%"}}></img>
                                </Col>
                            </Row>
                            <Row style={{width: "300px"}}>
                                <Col xs={4}>
                                    <h6 style={{fontWeight: "bold", marginTop: "2%"}}>부대시설</h6>
                                </Col>
                                <Col xs={1}>
                                    <h6 style={{fontWeight: "bold", marginTop: "2%"}}>4</h6>
                                </Col>
                                <Col xs={7}>
                                    <img src="/star.png" style={{width: "70%"}}></img>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={3}>
                            <Row>
                                <p>박주한 2021.03.16 09:58 작성</p>
                            </Row>
                            <Row>
                                <p>박주한 2021.03.16 수정</p>
                            </Row>
                            <Row style={{justifyContent: "right", marginTop: "5%"}}>
                                <Button variant="success" className={styles.detailreview_button1} onClick={submitSign}>수정</Button>
                                <Button variant="success" className={styles.detailreview_button2}>삭제</Button>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className={styles.detailreview_detail}>
                    게시글 보기
                </div>
                <hr />
                <div className={styles.detailreview_comment}>
                    <h4>댓글 (Counting Star~)</h4>
                </div>
            </Container>
        </div>
    );
}

export default detailreview;