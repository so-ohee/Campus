import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';
import { Container, Col, Row } from "react-bootstrap";
import styles from "../../styles/CampingPlace/CampingExplain.module.css";
import { receiveCamping_in, receiveCamping_out, BookMark, VisitCheck } from "../../function/axios";

function CampingExplain(props) {

    const [datas, setDatas] = useState(props);
    const [bookmark, setBookmark] = useState("");
    const [visit, setVisit] = useState("");
    const [userid, setUserid] = useState("");
    const [campid, setCampid] = useState("");
    const router = useRouter();

    function PressBookMark() {
        BookMark(router.query.campingplace, localStorage.getItem("userUid")).then((res) => (setBookmark(res.data.bookmark), console.log(res)));
    }

    function PressVisit() {
        VisitCheck(router.query.campingplace, localStorage.getItem("userUid")).then((res) => {setVisit(res.data.visit), console.log(res)});
    }

    useEffect(() => {
        setUserid(localStorage.getItem('userUid'))
    }, [])
    
    return (
        <>
            <Container>
                <Row>
                    {/* 사진 */}
                    <div className={styles.capmingplace_main_pic_div}>
                        <img className={styles.capmingplace_main_pic} src={props.props.firstImageUrl} />
                    </div>

                    {/* 캠피장 기본 설명, 찜하기, 방문여부, 리뷰작성 */}
                    <div className={styles.capmingplace_explain}>
                        <Row>
                            <Col xs={8}>
                                <h2 style={{fontWeight: "bold"}}>{props.props.facltNm}</h2>
                                <p>{props.props.addr1} {props.props.addr2}</p>
                                <p>{props.props.tel}</p>
                                <p style={{color: "skyblue"}}>
                                    {
                                        props.props.themaEnvrnCl !==null ? <a>#{props.props.themaEnvrnCl}</a> : null
                                    }
                                </p>
                                {
                                    props.props.resveCl !== null ? <h6>[{props.props.resveCl}]</h6> : null                                        
                                }
                                <Row>
                                    <Col xs={2}>
                                        <h6>숙소 사이트 </h6>
                                    </Col>
                                    {
                                        props.props.homepage !== null ?
                                            (
                                                <Col xs={10}>
                                                    <h6 style={{color: "blue", cursor:'pointer'}} onClick={() => window.open(`${props.props.homepage}`, '_blank')}>{props.props.homepage}</h6>
                                                </Col>
                                        ): null
                                    }
                                </Row>
                                <Row>
                                    <Col xs={2}>
                                        <h6>예약 사이트 </h6>
                                    </Col>
                                    {
                                        props.props.resveUrl !== null ?
                                        (
                                            <Col xs={10}>
                                                <h6 style={{color: "blue", cursor:'pointer'}} onClick={() => window.open(`${props.props.resveUrl}`, '_blank')}>{props.props.resveUrl}</h6>
                                            </Col>
                                        ): null
                                    }
                                </Row>
                            </Col>
                            <Col xs={4} >
                                {
                                    userid !== null ? 
                                        (
                                            <Row>
                                                <Col>
                                                <div style={{ textAlign: "-webkit-center" }} >
                                                    {props.props.bookmark == false ?
                                                        <img className={styles.campingexplain_icon} onClick={() => PressBookMark()} src="../../un_bookmark.png" />
                                                        : <img className={styles.campingexplain_icon} onClick={() => PressBookMark()} src="../../bookmark.png" />
                                                    }
                                                        <p className={styles.campingexplain_reserve}>북마크</p>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div style={{ textAlign: "-webkit-center" }}>
                                                        {
                                                            props.props.visit == false ? 
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
                                        ) : null
                                }
                            </Col>                  
                        </Row>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default CampingExplain;
