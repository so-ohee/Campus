import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';
import { Container, Col, Row } from "react-bootstrap";
import styles from "../../styles/CampingPlace/CampingExplain.module.css";
import { receiveCamping_in, receiveCamping_out, BookMark, VisitCheck } from "../../function/axios";

function CampingExplain(props) {

    const [datas, setDatas] = useState("");
    const [bookmark, setBookmark] = useState("");
    const [visit, setVisit] = useState("");
    const router = useRouter();

    useEffect(() => {
        receiveCamping_out(router.query.campingplace).then((res) => setDatas(res.data.campsite));
    }, [])

    function PressBookMark() {
        BookMark(router.query.campingplace, localStorage.getItem("userUid")).then((res) => setBookmark(res.data.bookmark));
    }

    function PressVisit() {
        VisitCheck(router.query.campingplace, localStorage.getItem("userUid")).then((res) => setVisit(res.data.visit));
    }

    console.log(visit);
        
    return (
        <>
            <Container>
                <Row>
                    {/* 사진 */}
                    <div className={styles.capmingplace_main_pic_div}>
                        <img className={styles.capmingplace_main_pic} src={datas.firstImageUrl} />
                    </div>

                    {/* 캠피장 기본 설명, 찜하기, 방문여부, 리뷰작성 */}
                    <div className={styles.capmingplace_explain}>
                        <Row>
                            <Col xs={8}>
                                <h2 style={{fontWeight: "bold"}}>{datas.facltNm}</h2>
                                <p>{datas.addr1} {datas.addr2}</p>
                                <p>{datas.tel}</p>
                                <p style={{color: "lightgrey"}}>
                                    {/* {dummy[0].hashtag.map((element, index) => {
                                        return <span key={index}>#{element} </span>;
                                    })} */}
                                    {
                                        datas.themaEnvrnCl !==null ? <a>#{datas.themaEnvrnCl}</a> : null
                                    }
                                </p>
                            </Col>
                            <Col xs={4} >
                                <Row>
                                    <Col>
                                        <div style={{ textAlign: "-webkit-center" }} >
                                            {
                                                bookmark == false ? 
                                                    <img className={styles.campingexplain_icon} onClick={() => PressBookMark()} src="../../un_bookmark.png" />
                                                    : <img className={styles.campingexplain_icon} onClick={() => PressBookMark()} src="../../bookmark.png" />
                                            }
                                            <p className={styles.campingexplain_reserve}>북마크</p>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div style={{ textAlign: "-webkit-center" }}>
                                            {
                                                visit == false ? 
                                                    <img className={styles.campingexplain_icon} onClick={() => PressVisit()} src="../../empty_marker.png" />
                                                    : <img className={styles.campingexplain_icon} onClick={() => PressVisit()} src="../../marker.png" />
                                            }
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
