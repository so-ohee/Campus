import React from 'react';
import { Button, Col, Container, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import styles from "/styles/Board/DetailReview.module.css";
import CommentCard from "/components/common/CommentCard";

const dummy = [
    {
        name: "서은민",
        content: "어쩌구 저쩌구 쏼라쏼라",
        date: "2022.03.16 11:07",
    },
    {
        name: "박소희",
        content: "어쩌구 저쩌구 쏼라쏼라 ㅋㅋㅋㅋㅋㅋ",
        date: "2022.03.16 11:11",
    },
];

function detailreview(props) {

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };
    const submitSign = () => {
        props.propFunction("수정")
    }
    const submitSign2 = () => {
        props.propFunction("기본")
    }
    
    return (
        <div>
            <Container>
                <h1 className={styles.detailreview_h1}>QnA / 자유 상세보기</h1>
                <div className={styles.detailreview_div}>
                    <Row>
                        <Col xs={9}>
                            <Row>
                                <h3 style={{fontWeight: "bold"}}>QnA / 자유</h3>
                            </Row>
                        </Col>
                        <Col xs={3}>
                            <Row>
                                <h6>박주한 2021.03.16 09:58 작성</h6>
                            </Row>
                            <Row>
                                <h6>박주한 2021.03.16 수정</h6>
                            </Row>
                            <Row style={{justifyContent: "right", marginTop: "5%"}}>
                                <Button variant="success" className={styles.detailreview_button1} onClick={submitSign}>수정</Button>
                                <Button variant="success" className={styles.detailreview_button2}>삭제</Button>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className={styles.detailreview_detail}>
                    게시글 보기
                </div>
                <hr />
                <div className={styles.detailreview_comment}>
                    <h4>댓글 (Counting Star~)</h4>
                </div>
                <Row style={{justifyContent: "center", marginBottom: "5%"}}>
                    {dummy.map((element, index) => {
                        return (
                            <Row sm key={index} style={{textAlignLast: "center"}}>
                                <CommentCard
                                    name={element.name}
                                    content={element.content}
                                    date={element.date}
                                />
                            </Row>
                        );
                    })}
                </Row>

                <div>
                    <Row className={styles.detailreview_buttons}>
                        <Button variant="success" className={styles.detailreview_button} onClick={submitSign2}>뒤로가기</Button>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default detailreview;