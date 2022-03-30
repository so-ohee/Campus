import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "../../styles/Board/DetailReview.module.css";
import CommentCard from "../Common/CommentCard";
import { campingBoardMore, articleDelete, commentSearch } from "../../function/axios";

function Detailreview(props) {

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    const submitSign = () => {
        props.propFunction("수정")
    }

    const submitSign2 = () => {
        props.propFunction("기본")
    }

    // 게시글 상세정보 받아오기
    const [datas, setDatas] = useState([]);
    const [pic, setPic] = useState([]);
    useEffect(() => {
        campingBoardMore(props.datas).then((res) => setDatas(res.data.board));
    }, [])
    useEffect(() => {
        campingBoardMore(props.datas).then((res) => setPic(res.data.board.files[0].filePath));
    }, [])

    // 게시글 삭제
    const deleteArticle = () => {
        articleDelete(datas.boardId).then(() => location.reload())
    }

    // 댓글 조회
    const [dummy, setDummy] = useState([]);
    
    useEffect(() => {
        commentSearch(props.datas).then((res) => setDummy(res.data.comment));
    }, [])
    
    // console.log(datas);

    return (
        <div>
            <Container>
                <div>
                    <Row className={styles.detailreview_buttons}>
                        <Button variant="success" className={styles.detailreview_button} onClick={submitSign2}>뒤로가기</Button>
                    </Row>
                </div>

                <h1 className={styles.detailreview_h1}>{datas.title}</h1>
                <div className={styles.detailreview_div}>
                    <Row>
                        <Col xs={9}>
                            <Row>
                                <h3 style={{fontWeight: "bold"}}>{datas.facltNm}</h3>
                            </Row>
                            <Row style={{width: "300px", marginTop: "1%"}}>
                                <Col xs={4}>
                                    <p style={{fontWeight: "bold", marginTop: "2%"}}>서비스</p>
                                </Col>
                                <Col xs={1}>
                                    <p style={{fontWeight: "bold", marginTop: "2%"}}>{datas.service}</p>
                                </Col>
                                <Col xs={7}>
                                    <img src="/star.png" style={{width: "70%"}}></img>
                                </Col>
                            </Row>
                            <Row style={{width: "300px"}}>
                                <Col xs={4}>
                                    <p style={{fontWeight: "bold", marginTop: "2%"}}>환경</p>
                                </Col>
                                <Col xs={1}>
                                    <p style={{fontWeight: "bold", marginTop: "2%"}}>{datas.environment}</p>
                                </Col>
                                <Col xs={7}>
                                    <img src="/star.png" style={{width: "70%"}}></img>
                                </Col>
                            </Row>
                            <Row style={{width: "300px"}}>
                                <Col xs={4}>
                                    <p style={{fontWeight: "bold", marginTop: "2%"}}>부대시설</p>
                                </Col>
                                <Col xs={1}>
                                    <p style={{fontWeight: "bold", marginTop: "2%"}}>{datas.facility}</p>
                                </Col>
                                <Col xs={7}>
                                    <img src="/star.png" style={{width: "70%"}}></img>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={3}>
                            <Row>
                                <p>{datas.name} {datas.createTime} 작성</p>
                            </Row>
                            <Row>
                                {
                                    datas.updateTime === null ? <p>수정되지 않은 글입니다.</p>
                                    : <p>{datas.name} {datas.updateTime} 수정</p>
                                }
                            </Row>
                            <Row style={{justifyContent: "right", marginTop: "15%", marginRight: "3%"}}>
                                <Button variant="success" className={styles.detailreview_button1} onClick={submitSign}>수정</Button>
                                <Button variant="success" className={styles.detailreview_button2} onClick={deleteArticle}>삭제</Button>
                            </Row>
                        </Col>
                    </Row>
                </div>
                
                <div style={{textAlign: "-webkit-center", marginTop: "2%", marginBottom: "2%"}}>
                    <img src={pic} style={{width: "500px", height: "350px"}} />
                </div>

                <div className={styles.detailreview_detail}>
                    {datas.content}
                </div>
                <hr />
                {
                    dummy === null ?
                        (
                            <>
                                <div className={styles.detailreview_comment}>
                                    <h4>댓글</h4>
                                </div>
                                <Row style={{justifyContent: "center", marginBottom: "5%"}}>
                                    {dummy.map((element, index) => {
                                        return (
                                            <Row sm key={index} style={{textAlignLast: "center"}}>
                                                <CommentCard
                                                    commentId={element.commentId}
                                                    src={element.profile}
                                                    name={element.name}
                                                    content={element.comment}
                                                    date={element.createTime}
                                                />
                                            </Row>
                                        );
                                    })}
                                </Row>
                            </>
                        ) :
                        (
                            <div className={styles.detailreview_comment}>
                                <h1 style={{textAlign: "center"}}>댓글이 없습니다</h1>
                            </div>
                        )
                }
            </Container>
        </div>
    );
}

export default Detailreview;