import { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import styles from '../../styles/MainPage/MainPageSecond.module.css';

function Second() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const goServey = () => {
        window.location.href = "survey";
    }
    
    let token = null;
    if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
    }

    return (
        <div className={styles.second_main}>
            <Container>
                <h1 className={styles.second_h1}>가고싶은 캠핑장을 지금 찾아보세요</h1>
                <Row id={styles.second_row}>
                    <Col>
                        <Row>
                            <Col xs={3}>
                            <img className={styles.second_pic} src="/fire.png" />
                            </Col>
                            <Col xs={9} id={styles.second_col}>
                                <div className={styles.second_div}>
                                    <h4 className={styles.second_h4}>알고리즘으로 찾는 캠핑장</h4>
                                    <p className={styles.second_h6}>Cras sit amet nibh libero
                                        , in gravida nulla. Nulla vel metus
                                        scelerisque ante sollicitudin. </p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col xs={3}>
                            <img className={styles.second_pic} src="/tent.png" />
                            </Col>
                            <Col xs={9} id={styles.second_col}>
                                <div className={styles.second_div}>
                                    <h4 className={styles.second_h4}>다양한 종류의 캠핑장</h4>
                                    <p className={styles.second_h6}>Cras sit amet nibh libero
                                    , in gravida nulla. Nulla vel metus
                                    scelerisque ante sollicitudin. </p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col xs={3}>
                            <img className={styles.second_pic} src="/lamp.png" />
                            </Col>
                            <Col xs={9} id={styles.second_col}>
                                <div className={styles.second_div}>
                                    <h4 className={styles.second_h4}>나에게 맞는 캠핑장 찾기</h4>
                                    {
                                        !token && (
                                            <>
                                            <p className={styles.second_servey} onClick={handleShow}>설문하러 가기... </p>
                                            <Modal show={show} onHide={handleClose} animation={false}>
                                                <Modal.Header closeButton>
                                                <Modal.Title>로그인 해주세요!</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                                </Modal.Footer>
                                            </Modal>
                                            </>
                                        )
                                    }
                                    {
                                        token && (
                                            <p className={styles.second_servey} onClick={() => goServey()}>설문하러 가기... </p>
                                        )
                                    }
                                    
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Second;