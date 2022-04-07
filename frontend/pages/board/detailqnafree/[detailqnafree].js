import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import styles from "../../../styles/Board/DetailReview.module.css";
import CommentCard from "../../../components/Common/CommentCard";
import { campingBoardMore, commentSearch, sendComment, articleDelete } from "../../../function/axios";
import { useRouter } from 'next/router';

function Detailreview() {

    const router = useRouter();
    const [userid, setUserid] = useState("");
    const [dummy, setDummy] = useState([]);
    const [change, setChange] = useState(false);
    const [page, setPage] = useState("");
    const [txt, setTxt] = useState('')

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };
    const submitSign = (boardId) => {
        router.push(`/board/modifyreview/${boardId}`);
    }

    // 게시판으로 가기
    const submitSign2 = () => {
        router.push('/board')
    }

    // 게시글 상세정보 받아오기
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        if (router.isReady) {
            campingBoardMore(router.query.detailqnafree).then((res) => setDatas(res.data.board))
            // 댓글 조회
            commentSearch(router.query.detailqnafree).then((res) => setDummy(res.data.comment))
        }
    }, [router.isReady, change])

    // 게시글 삭제
    const deleteArticle = (boardId) => {
        articleDelete(boardId);
    }

    // 댓글 작성
    function writeRecomment(props) {
        sendComment(datas.boardId, props, localStorage.getItem("userUid"))
        // .then(() =>
            // commentSearch(router.query.detailqnafree).then((res) => setDummy(res.data.comment), setChange(!change))
        // );
        location.reload()
    }

    useEffect(() => {
        setUserid(localStorage.getItem('userUid'))
    }, [])
    
    // 새로고침 또는 페이진 전환 시 초기 위치
    useEffect(() => {
        window.scrollTo(0, 500);
    }, []);

    const onChange = (e) => {
        setTxt(e.target.value)
    };

    return (
        <div>
            <Container>
                <div>
                    <Row className={styles.detailreview_buttons}>
                        <Button variant="success" className={styles.detailreview_button} onClick={submitSign2}>목록으로</Button>
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
                            {
                                userid == datas.userUid ?
                                    (
                                        <Row style={{ justifyContent: "right", marginTop: "5%" }}>
                                            <Button variant="success" className={styles.detailreview_button1} onClick={() => submitSign(router.query.detailqnafree)}>수정</Button>
                                            <Button variant="success" className={styles.detailreview_button2} onClick={() => deleteArticle(router.query.detailqnafree)}>삭제</Button>
                                        </Row>
                                    ) : null
                            }
                        </Col>
                    </Row>
                </div>
                <div className={styles.detailreview_detail}>
                    {datas.content}
                </div>
                <hr />
                <div style={{height: "100px"}}>
                    <input
                        className={styles.detailreview_input}
                        type="text"
                        placeholder='댓글을 입력하세요...'
                        value={txt}
                        onChange={onChange}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                writeRecomment(e.target.value);
                                setTxt('')
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
                                <h4>게시물에 대한 댓글을 입력해주세요.</h4>
                            </div>
                        )
                }
                
                
            </Container>
        </div>
    );
}

export default Detailreview;