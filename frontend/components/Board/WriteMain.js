import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import styles from "/styles/Board/WriteReview.module.css";
import WriteReview from '/components/Board/WriteReview.js';

function writereview(props) {

    const [page, setPage] = useState("리뷰");
    const highFunction = (text) => {
        setPage(text);
    }
    const review = () => {
        setPage("리뷰");
    }
    const free = () => {
        setPage("자유");
    }
    const qna = () => {
        setPage("QnA");
    }
    
    return (
        <div>
            <Container>
                <div style={{ marginTop: "5%", width: "350px" }}>
                    <Row>
                        <Col xs={4} style={{ marginTop: "2%" }}>
                            <h5 className={styles.writereview_category}>카테고리</h5>
                        </Col>
                        <Col xs={8}>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Select Category
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={review}>리뷰</Dropdown.Item>
                                    <Dropdown.Item onClick={free}>자유</Dropdown.Item>
                                    <Dropdown.Item onClick={qna}>QnA</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </div>
                {
                    page === "리뷰" && <WriteReview/>
                }
                {
                    page === "자유" && <WriteMain/>
                }
                {
                    page === "QnA" && <ModifyReview/>
                }
            </Container>
        </div>
    );
}

export default writereview;
