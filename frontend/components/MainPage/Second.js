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
                        <Row style={{placeContent: "center"}}>
                            <img className={styles.second_pic} src="../../fire.png" />
                            <div className={styles.second_div}>
                                <h4 className={styles.second_h4}>나와 비슷한 유저가 간 캠핑장</h4>
                            </div>
                        </Row>
                    </Col>
                    <Col>
                        <Row style={{placeContent: "center"}}>
                            <img className={styles.second_pic} src="../../tent.png" />
                            <div className={styles.second_div}>
                                <h4 className={styles.second_h4}>내가 방문한 캠핑장과 비슷한 캠핑장</h4>
                            </div>
                        </Row>
                    </Col>
                    <Col>
                        <Row style={{placeContent: "center"}}>
                            <img className={styles.second_pic} src="../../lamp.png" />
                            <div className={styles.second_div2}>
                                {
                                    !token && (
                                        <>
                                        <h4 className={styles.second_h5} onClick={handleShow} > 추천 받으러 가기</h4>
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
                                        <h4 className={styles.second_h5} onClick={() => goRecommend()} >추천 받으러 가기</h4>
                                    )
                                }
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Second;