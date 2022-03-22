import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from "/styles/Common/CommentCard.module.css";
import { commentDelete } from "../../function/axios"
import { useEffect, useState } from 'react';

function commentcard(params) {

    function deleteComment(commentId) {
        // console.log(commentId)
        commentDelete(commentId);
    }

    return (
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
                            <h6 className={styles.commentcard_h6}>{params.date}</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6 className={styles.commentcard_h6_2}>{params.content}</h6>
                        </Col>
                    </Row>
                </Col>
                <Col className={styles.commentcard_col} xs={2}>
                    <Row style={{justifyContent: "center"}}>
                        <Button variant="success" className={styles.commentcard_button1}>수정</Button>
                    </Row>
                    <Row style={{justifyContent: "center"}}>
                        <Button variant="success" className={styles.commentcard_button2} onClick={() => deleteComment(params.commentId)}>삭제</Button>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
export default commentcard;