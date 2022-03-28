import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Col, Row } from "react-bootstrap";
import styles from "../../styles/CampingPlace/CampingIntro.module.css";
import { receiveCamping_in, receiveCamping_out } from "../../function/axios";

function CampingIntro(props) {

    const [datas, setDatas] = useState("");
    const router = useRouter();

    useEffect(() => {
        receiveCamping_out(router.query.campingplace).then((res) => setDatas(res.data.campsite));
    }, [])

    return (
        <>
            <Container>
                <Row>
                    {/* 캠핑장 사진 모음 */}
                    <div className={styles.capmingplace_main_pic_gather}>
                        <img className={styles.capmingplace_main_pic} src="../../logo.png" />
                    </div>

                    {/* 캠핑장 설명 */}
                    <div className={styles.capmingplace_main_explain2}>
                        <div>
                            {datas.intro}
                        </div>
                    </div>

                    {/* 캠핑장 정보 */}
                    <div>
                        <h2 style={{fontWeight: "bold"}}>캠핑장 정보</h2>
                    </div>
                    <div className={styles.capmingplace_main_explain3}>
                        <div>
                            캠핑장 아이콘 들어가는 곳
                        </div>
                    </div>

                    {/* 캠핑장 정보(표) */}
                    <div className={styles.capmingplace_main_explaingraph}>
                        <Row className={styles.capmingplace_main_explaingraph_row}>
                            <Col>
                                <p style={{fontWeight: "bold"}}>캠핑장 환경</p>
                            </Col>
                            <Col>
                                <p>해변 / 국립공원</p>
                            </Col>
                            <Col>
                                <p style={{fontWeight: "bold"}}>주요시설</p>
                            </Col>
                            <Col>
                                <p>일반야영장 (69면)</p>
                            </Col>
                        </Row>
                        <Row className={styles.capmingplace_main_explaingraph_row2}>
                            <Col>
                                <p style={{fontWeight: "bold"}}>캠핑장 유형</p>
                            </Col>
                            <Col>
                                <p>일반야영장, 자동차야영장</p>
                            </Col>
                            <Col>
                                <p style={{fontWeight: "bold"}}>바닥형태</p>
                            </Col>
                            <Col>
                                <p>맨흙 (69)</p>
                            </Col>
                        </Row>
                        <Row className={styles.capmingplace_main_explaingraph_row2}>
                            <Col>
                                <p style={{fontWeight: "bold"}}>운영기간</p>
                            </Col>
                            <Col>
                                <p>봄, 여름, 가을, 겨울</p>
                            </Col>
                            <Col>
                                <p style={{fontWeight: "bold"}}>반려동물</p>
                            </Col>
                            <Col>
                                <p>출입 불가능</p>
                            </Col>
                        </Row>
                        <Row className={styles.capmingplace_main_explaingraph_row2}>
                            <Col>
                                <p style={{fontWeight: "bold"}}>운영일</p>
                            </Col>
                            <Col>
                                <p>평일+주말</p>
                            </Col>
                            <Col>
                                <p style={{fontWeight: "bold"}}>화로대</p>
                            </Col>
                            <Col>
                                <p>개별</p>
                            </Col>
                        </Row>
                    </div>
                    
                </Row>
            </Container>
        </>
    );
}

export default CampingIntro;
