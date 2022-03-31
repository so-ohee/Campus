import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container, Col, Row } from "react-bootstrap";
import styles from "../../styles/CampingPlace/CampingIntro.module.css";
import { receiveCamping_in, receiveCamping_out } from "../../function/axios";

function CampingIntro(props) {

    const [datas, setDatas] = useState("");
    const router = useRouter();


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
                            {props.props.intro}
                        </div>
                    </div>

                    {/* 캠핑장 정보 */}
                    <div>
                        <h2 style={{fontWeight: "bold"}}>캠핑장 시설 정보</h2>
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
                                <p>{props.props.lctCl}</p>
                            </Col>
                            <Col>
                                <p style={{fontWeight: "bold"}}>주요시설</p>
                            </Col>
                            <Col>
                                <p>{props.props.posblFcltyCl}</p>
                            </Col>
                        </Row>
                        <Row className={styles.capmingplace_main_explaingraph_row2}>
                            <Col>
                                <p style={{fontWeight: "bold"}}>캠핑장 유형</p>
                            </Col>
                            <Col>
                                <p>{props.props.induty}</p>
                            </Col>
                            <Col>
                                <p style={{fontWeight: "bold"}}>바닥형태</p>
                            </Col>
                            <Col>
                                <p>
                                    {
                                        props.props.siteBottomCl1 == 0 ? 
                                            (
                                                props.props.siteBottomCl2 == 0 ?
                                                    (
                                                        props.props.siteBottomCl3 == 0 ? 
                                                            (
                                                                props.props.siteBottomCl4 == 0 ? (
                                                                    props.props.siteBottomCl5 == 0 ? null : "맨흙 ("+`${props.props.siteBottomCl5}`+")"
                                                                ) : "자갈 ("+`${props.props.siteBottomCl4}`+")"
                                                            ) : "테크 ("+`${props.props.siteBottomCl3}`+")"
                                                    ) : "파쇄석 ("+`${props.props.siteBottomCl2}`+")"
                                            ) : "잔디 ("+`${props.props.siteBottomCl1}`+")"
                                    }
                                </p>
                            </Col>
                        </Row>
                        <Row className={styles.capmingplace_main_explaingraph_row2}>
                            <Col>
                                <p style={{fontWeight: "bold"}}>운영기간</p>
                            </Col>
                            <Col>
                                <p>{props.props.operPdCl}</p>
                            </Col>
                            <Col>
                                <p style={{fontWeight: "bold"}}>반려동물</p>
                            </Col>
                            <Col>
                                <p>출입 {props.props.animalCmgCl}</p>
                            </Col>
                        </Row>
                        <Row className={styles.capmingplace_main_explaingraph_row2}>
                            <Col>
                                <p style={{fontWeight: "bold"}}>운영일</p>
                            </Col>
                            <Col>
                                <p>{props.props.operDeCl}</p>
                            </Col>
                            <Col>
                                <p style={{fontWeight: "bold"}}>화로대</p>
                            </Col>
                            <Col>
                                <p>{props.props.brazierCl}</p>
                            </Col>
                        </Row>
                    </div>
                    
                </Row>
            </Container>
        </>
    );
}

export default CampingIntro;
