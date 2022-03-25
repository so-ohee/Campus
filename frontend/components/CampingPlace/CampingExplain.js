import React from 'react';
import { Container, Col, Row } from "react-bootstrap";
import styles from "../../styles/CampingPlace/CampingExplain.module.css";

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

// export async function receiveId(res) {
//     console.log(res);
// }

function CampingExplain() {

    return (
        <>
            <Container>
                <Row>
                    {/* 사진 */}
                    <div className={styles.capmingplace_main_pic_div}>
                        <img className={styles.capmingplace_main_pic} src="../../logo.png" />
                    </div>

                    {/* 캠피장 기본 설명, 찜하기, 방문여부, 리뷰작성 */}
                    <div className={styles.capmingplace_explain}>
                        <Row>
                            <Col xs={8}>
                                <h2 style={{fontWeight: "bold"}}>{dummy[0].title}</h2>
                                <p>{dummy[0].address}</p>
                                <p>{dummy[0].phone}</p>
                                <p style={{color: "lightgrey"}}>
                                    {dummy[0].hashtag.map((element, index) => {
                                        return <span key={index}>#{element} </span>;
                                    })}
                                </p>
                            </Col>
                            <Col xs={4} >
                                <Row>
                                    <Col>
                                        <div style={{textAlign: "-webkit-center"}}>
                                            <img className={styles.campingexplain_icon} src="../../empty_heart.png" />
                                            <p className={styles.campingexplain_reserve}>찜하기</p>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div style={{textAlign: "-webkit-center"}}>
                                            <img className={styles.campingexplain_icon2} src="../../empty_marker.png" />
                                            <p className={styles.campingexplain_visit}>방문여부</p>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div style={{textAlign: "-webkit-center"}}>
                                            <img className={styles.campingexplain_icon} src="../../comment.png" />
                                            <p className={styles.campingexplain_rewiew}>리뷰작성</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default CampingExplain;
