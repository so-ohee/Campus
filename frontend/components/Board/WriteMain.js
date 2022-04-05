import React, { useState } from 'react';
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap';
import styles from "../../styles/Board/WriteReview.module.css";
import WriteReview from '../Board/WriteReview';
import WriteQna from '../Board/WriteQna.js';
import WriteFree from '../Board/WriteFree.js';
import { useRouter } from 'next/router';

function Writermain(props) {

    const [page, setPage] = useState("리뷰");
    const router = useRouter();
    const review = () => {
        setPage("리뷰");
    }
    const free = () => {
        setPage("자유");
    }
    const qna = () => {
        setPage("QnA");
    }
    const submitSign = () => {
        location.reload();
    }

    return (
        <div>
            <Container>
                <div style={{ marginTop: "3%", marginBottom: "5%", width: "100%" }}>
                    <Row>
                        <Col xs={1} style={{ marginTop: "0.5%" }}>
                            <h5 className={styles.writereview_category}>카테고리</h5>
                        </Col>
                        <Col xs={9}>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {page}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={review}>리뷰</Dropdown.Item>
                                    <Dropdown.Item onClick={free}>자유</Dropdown.Item>
                                    <Dropdown.Item onClick={qna}>QnA</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col xs={2}>
                        <Button variant="success" className={styles.writereview_button2} onClick={submitSign}>뒤로가기</Button>
                        </Col>
                    </Row>
                </div>
                {
                    page === "리뷰" && <WriteReview props={page}/>
                }
                {
                    page === "자유" && <WriteFree props={page}/>
                }
                {
                    page === "QnA" && <WriteQna props={page}/>
                }
            </Container>
        </div>
    );
}

export default Writermain;