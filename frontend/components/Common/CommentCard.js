import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "../../styles/Common/CommentCard.module.css";
import { commentDelete, modifyComment, commentSearch } from "../../function/axios"
import { useEffect, useState } from 'react';

function commentcard(params) {

    const [state, setState] = useState(false);
    const [content, setContent] = useState(params.content);

    function deleteComment(commentId) {
        commentDelete(commentId);
    }

    return (
        <>
            {
                state === false ? 
                    (
                        <Container>
                            <Row className={styles.commentcard_row}>
                                <Col className={styles.commentcard_col} xs={2}>
                                    <img className={styles.commentcard_profile} src={params.src} ></img>
                                </Col>
                                <Col className={styles.commentcard_col} xs={8}>
                                    <Row>
                                        <Col xs={2}>
                                            <h5 className={styles.commentcard_h5}>{params.name}</h5>
                                        </Col>
                                        <Col xs={10}>
                                            <p className={styles.commentcard_h6}>{params.date}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p className={styles.commentcard_h6_2}>{params.content}</p>
                                        </Col>
                                    </Row>
                                </Col>
                                {
                                    localStorage.getItem("userUid") == params.userUid ?
                                        (
                                            <Col className={styles.commentcard_col} xs={2}>
                                                <Row style={{justifyContent: "center"}}>
                                                    <Button variant="success" className={styles.commentcard_button1} onClick={() => setState(!state)}>수정</Button>
                                                </Row>
                                                <Row style={{justifyContent: "center"}}>
                                                    <Button variant="success" className={styles.commentcard_button2} onClick={() => deleteComment(params.commentId)}>삭제</Button>
                                                </Row>
                                            </Col>
                                        ) : null
                                }
                                
                            </Row>
                        </Container>
                    ) : 
                    (
                        <Container>
                            <Row className={styles.commentcard_row}>
                                <Col className={styles.commentcard_col} xs={2}>
                                    <img className={styles.commentcard_profile} src={params.src} ></img>
                                </Col>
                                <Col className={styles.commentcard_col} xs={8}>
                                    <Row>
                                        <Col xs={2}>
                                            <h5 className={styles.commentcard_h5}>{params.name}</h5>
                                        </Col>
                                        <Col xs={10}>
                                            <p className={styles.commentcard_h6}>{params.date}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <input
                                                className={styles.commentcard_input}
                                                type="text"
                                                placeholder='댓글을 입력하세요...'
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        modifyComment(e.target.value, params.commentId).then(() => {
                                                            setState(!state)
                                                        });
                                                    }
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                {
                                    localStorage.getItem("userUid") == params.userUid ?
                                        (
                                            <Col className={styles.commentcard_col} xs={2}>
                                                <Row style={{ justifyContent: "center" }}>
                                                    <Button variant="success" className={styles.commentcard_button2} onClick={() => deleteComment(params.commentId)}>삭제</Button>
                                                </Row>
                                            </Col>
                                        ) : null
                                }
                            </Row>
                        </Container>
                    )
            }
            
        </>
        
    );
}
export default commentcard;