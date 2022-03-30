import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import styles from "../../styles/Board/DetailReview.module.css";
import CommentCard from "../Common/CommentCard";
import { campingBoardMore, commentSearch, sendComment, articleDelete } from "../../function/axios";

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
    useEffect(() => {
        campingBoardMore(props.datas).then((res) => setDatas(res.data.board));
    }, [])

    // 댓글 조회
    const [dummy, setDummy] = useState([]);
    useEffect(() => {
        commentSearch(props.datas).then((res) => setDummy(res.data.comment));
    }, [])

    // 게시글 삭제
    const deleteArticle = () => {
        articleDelete(datas.boardId);
    }

    // 댓글 작성
    function writeRecomment(props) {
        sendComment(datas.boardId, props, localStorage.getItem("userUid"));
    }

    
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
                                <p style={{fontWeight: "bold"}}>{datas.category}</p>
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
                            <Row style={{justifyContent: "right", marginTop: "5%"}}>
                                <Button variant="success" className={styles.detailreview_button1} onClick={submitSign}>수정</Button>
                                <Button variant="success" className={styles.detailreview_button2} onClick={deleteArticle}>삭제</Button>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className={styles.detailreview_detail}>
                    {datas.content}
                </div>
                <hr />
                
                {
                    dummy !== undefined ?
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
                
                <div style={{height: "100px"}}>
                    <input
                        className={styles.detailreview_input}
                        type="text"
                        placeholder='댓글을 입력하세요...'
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                writeRecomment(e.target.value);
                            }
                        }}
                    />
                </div>
            </Container>
        </div>
    );
}

export default Detailreview;