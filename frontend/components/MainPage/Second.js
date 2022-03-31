import { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import styles from '../../styles/MainPage/MainPageSecond.module.css';
import { useRouter } from 'next/router';
import  { isSurvey }  from "../../function/axios";

function Second() {
    const router = useRouter()

    const [survey, setSurvey] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const goRecommend = () => {
        if (survey === true){
            router.push('/recommend')
        }else{
            router.push('/survey')
        }
        
    }
    
    useEffect(() => {
        isSurvey(localStorage.getItem("userUid")).then((res) => {
            if (res.data.message === '설문 조회 성공'){
                setSurvey(true)
            }   
            // console.log(res.data)
        })
    }, []);

    let token = null;
    if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
    }

    return (
        <div className={styles.second_main}>
            <Container>
                <h1 className={styles.second_h1}>가고 싶은 캠핑장을 지금 찾아보세요</h1>
                <Row id={styles.second_row}>
                    <Col>
                        <Row>
                            <Col xs={3}>
                            <img className={styles.second_pic} src="../../fire.png" />
                            </Col>
                            <Col xs={9} id={styles.second_col}>
                                <div className={styles.second_div}>
                                    <h4 className={styles.second_h4}>나와 비슷한 유저가 간 캠핑장</h4>
                                    {/* <p className={styles.second_h6}>Cras sit amet nibh libero
                                        , in gravida nulla. Nulla vel metus
                                        scelerisque ante sollicitudin. </p> */}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col xs={3}>
                            <img className={styles.second_pic} src="../../tent.png" />
                            </Col>
                            <Col xs={9} id={styles.second_col}>
                                <div className={styles.second_div}>
                                    <h4 className={styles.second_h4}>내가 방문한 캠핑장과 비슷한 캠핑장</h4>
                                    {/* <p className={styles.second_h6}>Cras sit amet nibh libero
                                    , in gravida nulla. Nulla vel metus
                                    scelerisque ante sollicitudin. </p> */}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col xs={3}>
                            <img className={styles.second_pic} src="../../lamp.png" />
                            </Col>
                            <Col xs={9} id={styles.second_col}>
                                <div className={styles.second_div}>
                                    {/* <h4 className={styles.second_h4}>나에게 맞는 캠핑장을 찾아보세요</h4> */}
                                    {
                                        !token && (
                                            <>
                                            <a className={styles.second_h5} onClick={handleShow} > <h4>추천 받으러 가기</h4></a>
                                            {/* <p className={styles.second_servey} style={{cursor:'pointer'}} onClick={handleShow}>추천받으러가기</p> */}
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
                                            // <p className={styles.second_servey} onClick={() => goServey()}>설문하러 가기... </p>
                                            <a className={styles.second_h4} onClick={() => goRecommend()} > <h4>추천 받으러 가기</h4></a>
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