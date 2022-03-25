import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "/styles/Board/ModifyReview.module.css";

function Modifyreview(props) {

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };
    const submitSign = () => {
        props.propFunction("상세")
    }
    
    return (
        <div>
            <Container>
                <h1 className={styles.modifyreview_h1}>수정하기</h1>
                <div className={styles.modifyreview_div}>
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
                                <h6>박주한 2021.03.16 09:58 작성</h6>
                            </Row>
                            <Row style={{justifyContent: "right", marginTop: "5%"}}>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className={styles.modifyreview_title}>
                    제목
                </div>
                <div className={styles.modifyreview_content}>
                    내용입니다~~~~~~~~~~<br />
                    내용입니다~~~~~~~~~~<br />
                    내용입니다~~~~~~~~~~<br />
                    내용입니다~~~~~~~~~~<br />
                    내용입니다~~~~~~~~~~<br />
                </div>
                <Row className={styles.modifyreview_buttons}>
                    <Button variant="success" className={styles.modifyreview_button}>수정</Button>
                    <Button variant="success" className={styles.modifyreview_button} onClick={submitSign}>뒤로가기</Button>
                </Row>
            </Container>
        </div>
    );
}

export default Modifyreview;