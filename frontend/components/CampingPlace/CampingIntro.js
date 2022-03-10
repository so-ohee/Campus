import { Container, Col, Row } from "react-bootstrap";
import styles from "/styles/CampingPlace/CampingIntro.module.css";

function Camp() {
    return (
        <>
            <Container>
                <Row>
                    {/* 캠핑장 사진 모음 */}
                    <div className={styles.capmingplace_main_pic_gather}>
                        <img className={styles.capmingplace_main_pic} src="/logo.png" />
                    </div>

                    {/* 캠핑장 설명 */}
                    <div className={styles.capmingplace_main_explain2}>
                        <div>
                            고사포 해변은 변산반도 국립공원에 포함된 해수욕장이다.약 2km에 이르는 백사장과 방풍을 위해 심어 놓은 약 300m의 넓고 긴 송림이 장관을 이룬다.
                            일대의 해수욕장중에서 가장 큰 규모를 자랑한다. 울창한 송림은 야영지로서 적격이다. 고사포야영장은 이곳 고사포 해수욕장 송림안에 마련되어 있다.
                            해수욕장 앞에는 새우 모양을 닮았다 하여 새우섬 또는 하섬으로 불리는 작은 섬이 하나있다.
                            매월 음력 보름이나 그믐쯤에는 해수욕장에서 이곳까지 사람들이 현대판 모세의 기적이라고 부르는 약 2km의 바닷길이 열린다.
                            이때에는 섬까지 걸어갈 수있으며, 조개나 낙지·해삼 등을 잡는 즐거움도 누릴 수 있다.
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
                                <h6 style={{fontWeight: "bold"}}>캠핑장 환경</h6>
                            </Col>
                            <Col>
                                <h6>해변 / 국립공원</h6>
                            </Col>
                            <Col>
                                <h6 style={{fontWeight: "bold"}}>주요시설</h6>
                            </Col>
                            <Col>
                                <h6>일반야영장 (69면)</h6>
                            </Col>
                        </Row>
                        <Row className={styles.capmingplace_main_explaingraph_row2}>
                            <Col>
                                <h6 style={{fontWeight: "bold"}}>캠핑장 유형</h6>
                            </Col>
                            <Col>
                                <h6>일반야영장, 자동차야영장</h6>
                            </Col>
                            <Col>
                                <h6 style={{fontWeight: "bold"}}>바닥형태</h6>
                            </Col>
                            <Col>
                                <h6>맨흙 (69)</h6>
                            </Col>
                        </Row>
                        <Row className={styles.capmingplace_main_explaingraph_row2}>
                            <Col>
                                <h6 style={{fontWeight: "bold"}}>운영기간</h6>
                            </Col>
                            <Col>
                                <h6>봄, 여름, 가을, 겨울</h6>
                            </Col>
                            <Col>
                                <h6 style={{fontWeight: "bold"}}>반려동물</h6>
                            </Col>
                            <Col>
                                <h6>출입 불가능</h6>
                            </Col>
                        </Row>
                        <Row className={styles.capmingplace_main_explaingraph_row2}>
                            <Col>
                                <h6 style={{fontWeight: "bold"}}>운영일</h6>
                            </Col>
                            <Col>
                                <h6>평일+주말</h6>
                            </Col>
                            <Col>
                                <h6 style={{fontWeight: "bold"}}>화로대</h6>
                            </Col>
                            <Col>
                                <h6>개별</h6>
                            </Col>
                        </Row>
                    </div>
                    
                </Row>
            </Container>
        </>
    );
}

export default Camp;
