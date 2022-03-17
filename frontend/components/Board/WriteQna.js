import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import styles from "/styles/Board/WriteReview.module.css";

function writeqna(props) {

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    const submitSign = () => {
        props.propFunction("기본")
    }
    
    return (
        <div>
            <Container>
                <h1 className={styles.writereview_h1}>QnA 작성</h1>

                {/* 게시글 제목 */}
                <div style={{marginBottom: "2%"}}>
                    <h5 className={styles.writereview_title}>제목</h5>
                    <input className={styles.writereview_input2} />
                </div>

                {/* 게시글 입력창 */}
                <div style={{marginBottom: "2%"}}>
                    <textarea className={styles.writereview_textarea} />
                </div>

                <div>
                    <Row className={styles.writereview_buttons}>
                        <Button variant="success" className={styles.writereview_button}>수정</Button>
                        <Button variant="success" className={styles.writereview_button} onClick={submitSign}>뒤로가기</Button>
                    </Row>
                </div>

            </Container>
        </div>
    );
}

export default writeqna;
