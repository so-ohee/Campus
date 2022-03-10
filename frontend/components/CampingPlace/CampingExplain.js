import { Container, Col, Row } from "react-bootstrap";
import styles from "/styles/CampingPlace/CampingExplain.module.css";

const dummy = [
    {
        title: "달천공원오토캠핑장",
        address: "강원도 횡성군 갑천면 외갑천로 301",
        hashtag: ["일출명소", "일몰명소", "봄꽃여행", "여름물놀이", "걷기길"],
        phone: "010-1234-1234"
    },
    {
        title: "청풍호오토캠핑장",
        address: "충청북도 제천시 청풍면 용곡길 211번길 2",
        hashtag: ["짚라인", "체험형", "캠핑요리"],
    },
    {
        title: "마음이 머무는 곳",
        address: "강원도 화천군 사내면 포화로 653-76",
        hashtag: ["아로마향초만들기", "천연염색", "캠핑요리"],
    },
];

function CampingExplain() {
    return (
        <>
            <Container>
                <Row>
                    {/* 사진 */}
                    <div className={styles.capmingplace_main_pic_div}>
                        <img className={styles.capmingplace_main_pic} src="/logo.png" />
                    </div>

                    {/* 캠피장 기본 설명, 찜하기, 방문여부, 리뷰작성 */}
                    <div className={styles.capmingplace_explain}>
                        <Row>
                            <Col xs={8}>
                                <h2 style={{fontWeight: "bold"}}>{dummy[0].title}</h2>
                                <h6>{dummy[0].address}</h6>
                                <h6>{dummy[0].phone}</h6>
                                <h6 style={{color: "lightgrey"}}>
                                    {dummy[0].hashtag.map((element, index) => {
                                        return <span key={index}>#{element} </span>;
                                    })}
                                </h6>
                            </Col>
                            <Col xs={4} >
                                <Row>
                                    <Col>
                                        <div style={{textAlign: "-webkit-center"}}>
                                            <img className={styles.campingexplain_icon} src="/empty_heart.png" />
                                            <h6 className={styles.campingexplain_reserve}>찜하기</h6>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div style={{textAlign: "-webkit-center"}}>
                                            <img className={styles.campingexplain_icon2} src="/empty_marker.png" />
                                            <h6 className={styles.campingexplain_visit}>방문여부</h6>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div style={{textAlign: "-webkit-center"}}>
                                            <img className={styles.campingexplain_icon} src="/comment.png" />
                                            <h6 className={styles.campingexplain_rewiew}>리뷰작성</h6>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>

                    {/* 선택바(캠핑장소개, 위치&주변정보, 리뷰, 이용안내) */}
                    <div className={styles.campingexplain_selectbar}>
                        <Row>
                            <Col xs={3}>
                                <div className={styles.campingexplain_select}>
                                    <h4>캠핑장 소개</h4>
                                </div>
                            </Col>
                            <Col xs={3}>
                                <div className={styles.campingexplain_select}>
                                    <h4>캠핑장 위치 & 주변 정보</h4>
                                </div>
                            </Col>
                            <Col xs={3}>
                                <div className={styles.campingexplain_select}>
                                    <h4>캠핑장 리뷰</h4>
                                </div>
                            </Col>
                            <Col xs={3}>
                                <div className={styles.campingexplain_select}>
                                    <h4>캠핑장 이용안내</h4>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default CampingExplain;
