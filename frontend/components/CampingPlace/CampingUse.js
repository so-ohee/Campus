import { Container, Col, Row } from "react-bootstrap";
import styles from "../../styles/CampingPlace/CampingUse.module.css";

function CampingUse() {
    return (
        <>
            <Container>
                {/* 안전 및 시설 배치도(제목) */}
                <div className={styles.campinguse_div}>
                    <Row>
                        <Col xs={1} style={{textAlignLast: "center"}}>
                            <img className={styles.campinguse_arrow} src="/arrow.png" />
                        </Col>
                        <Col xs={11}>
                            <h4 className={styles.campinguse_h4}>안전 및 시설 배치도</h4>
                        </Col>
                    </Row>
                </div>

                {/* 안전 및 시설 배치도(사진) */}
                <div className={styles.campinguse_div2}>
                    <img src="/logo.png" />
                </div>

                {/* 입장료 안내(제목) */}
                <div className={styles.campinguse_div}>
                    <Row>
                        <Col xs={1} style={{textAlignLast: "center"}}>
                            <img className={styles.campinguse_arrow} src="/arrow.png" />
                        </Col>
                        <Col xs={11}>
                            <h4 className={styles.campinguse_h4}>입장료 안내</h4>
                        </Col>
                    </Row>
                </div>

                {/* 안전 및 시설 배치도(사진) */}
                <div className={styles.campinguse_div3}>
                    <img src="/logo.png" />
                </div>
            </Container>
        </>
    );
}

export default CampingUse;
