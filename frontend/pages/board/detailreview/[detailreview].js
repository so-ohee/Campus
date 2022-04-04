import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "../../../styles/Board/DetailReview.module.css";
import { Rating } from 'react-simple-star-rating'
import CommentCard from "../../../components/Common/CommentCard";
import { campingBoardMore, articleDelete, commentSearch, sendComment } from "../../../function/axios";
import { useRouter } from 'next/router';
import { useHistory } from 'react-router-dom';

function Detailreview() {

    const router = useRouter();

    const submitSign = (boardId) => {
        // props.propFunction("수정")
        router.push(`/board/modifyreview/${boardId}`);
        // props.propData(datas)
    }

    // 게시판으로 가기
    const submitSign2 = () => {
        router.push('/board')
    }

    // 게시글 상세정보 받아오기
    const [datas, setDatas] = useState([]);
    const [pic, setPic] = useState([]);
    const [dummy, setDummy] = useState([]);
    let history = useHistory();

    useEffect(() => {
        if (router.isReady) {
            campingBoardMore(router.query.detailreview).then((res) => {
                setPic(res.data.board.files[0].filePath)
                setDatas(res.data.board)
            });
            // 댓글 조회
            commentSearch(router.query.detailreview).then((res) => setDummy(res.data.comment));
        }
    }, [router.isReady])

    // 게시글 삭제
    const deleteArticle = () => {
        articleDelete(datas.boardId);
    }

    // 댓글 작성
    function writeRecomment(props) {
        sendComment(datas.boardId, props, localStorage.getItem("userUid")).then(() => 
            commentSearch(router.query.detailreview).then((res) => setDummy(res.data.comment))
        );
    }

    console.log(dummy)

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
                                    <Rating
                                        initialValue={datas.service}
                                        size={30}
                                        allowHover={false}
                                    />
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
                                    <Rating
                                        initialValue={datas.environment}
                                        size={30}
                                        allowHover={false}
                                    />
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
                                    <Rating
                                        initialValue={datas.facility}
                                        size={30}
                                        allowHover={false}
                                        transition={false}
                                    />
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

                            {
                                localStorage.getItem("userUid") == datas.userUid ?
                                    (
                                        <Row style={{ justifyContent: "right", marginTop: "15%", marginRight: "3%" }}>
                                            <Button variant="success" className={styles.detailreview_button1} onClick={() => submitSign(router.query.detailreview)}>수정</Button>
                                            <Button variant="success" className={styles.detailreview_button2} onClick={deleteArticle}>삭제</Button>
                                        </Row>
                                    ) : null
                            }
                            
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
                        
                <div style={{height: "100px", textAlign: "-webkit-center"}}>
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
                                                    userUid={element.userUid}
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
                            <div className={styles.detailreview_comment2}>
                                <img className={styles.navi_pic} src="../../NoResult.png" style={{width: "30%", marginBottom: "2%"}}/>
                                <h2 style={{ fontWeight: "bold" }}>댓글이 없습니다.</h2>
                                <h4>캠핑장에 대한 댓글을 입력해주세요.</h4>
                            </div>
                        )
                }
            </Container>
        </div>
    );
}

export default Detailreview;