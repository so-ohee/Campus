import { useRouter } from 'next/router';
import React, { useState} from 'react';
import { Container, Col, Row } from "react-bootstrap";
import styles from "../../styles/CampingPlace/CampingExplain.module.css";
import { BookMark, VisitCheck } from "../../function/axios";
import WriteMain from '../Board/WriteMain';

function CampingExplain(props) {

    const [datas, setDatas] = useState("");
    const [bookmark, setBookmark] = useState("");
    const [visit, setVisit] = useState("");
    const router = useRouter();
    
    function PressBookMark() {
        BookMark(router.query.campingplace, localStorage.getItem("userUid")).then((res) => {setBookmark(res.data.bookmark), document.location.reload(true)});
    }

    function PressVisit() {
        VisitCheck(router.query.campingplace, localStorage.getItem("userUid")).then((res) => {setVisit(res.data.visit), document.location.reload(true)});
    }

    function WriteComment() {
        router.push('/board')
    }

    return (
        <>
            {
                props.props &&
                <Container>
                    <Row>
                        {/* 사진 */}
                        <div className={styles.capmingplace_main_pic_div}>
                            <img className={styles.capmingplace_main_pic} src={props.props.campsite.firstImageUrl} />
                        </div>

                        {/* 캠피장 기본 설명, 찜하기, 방문여부, 리뷰작성 */}
                        <div className={styles.capmingplace_explain}>
                            <Row>
                                <Col xs={8}>
                                    <h2 style={{fontWeight: "bold"}}>{props.props.campsite.facltNm}</h2>
                                    <p>{props.props.campsite.addr1} {props.props.campsite.addr2}</p>
                                    <p>{props.props.campsite.tel}</p>
                                    <p style={{color: "lightgrey"}}>
                                        {
                                            props.props.campsite.themaEnvrnCl !==null ? <a>#{props.props.campsite.themaEnvrnCl}</a> : null
                                        }
                                    </p>
                                </Col>
                                <Col xs={4} >
                                    <Row>
                                        <Col>
                                            <div style={{ textAlign: "-webkit-center" }} >
                                                {
                                                    props.props.bookmark !== false ? 
                                                        <img className={styles.campingexplain_icon} onClick={() => PressBookMark()} src="../../un_bookmark.png" />
                                                        : <img className={styles.campingexplain_icon} onClick={() => PressBookMark()} src="../../bookmark.png" />
                                                }
                                                <p className={styles.campingexplain_reserve} onClick={() => PressBookMark()}>북마크</p>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div style={{ textAlign: "-webkit-center" }}>
                                                {
                                                    props.props.visit !== false ? 
                                                        <img className={styles.campingexplain_icon} onClick={() => PressVisit()} src="../../empty_marker.png" />
                                                        : <img className={styles.campingexplain_icon} onClick={() => PressVisit()} src="../../marker.png" />
                                                }
                                                <p className={styles.campingexplain_visit} onClick={() => PressVisit()}>방문여부</p>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div style={{textAlign: "-webkit-center"}}>
                                                <img className={styles.campingexplain_icon} onClick={() => WriteComment()} src="../../comment.png" />
                                                <p className={styles.campingexplain_rewiew} onClick={() => WriteComment()}>리뷰작성</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </Container>

            }
        
        </>
    );
}

export default CampingExplain;
