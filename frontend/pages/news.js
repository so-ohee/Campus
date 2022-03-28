import React from 'react';
import { Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import styles from "../styles/News/News.module.css";
import Pagination from 'react-bootstrap/Pagination';

function news(props) {

    const submitSign = () => {
        props.propFunction("작성")
    }
    
    // Pagination
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
            {number}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <Container>
                <h1 className={styles.news_h1}>캠핑 뉴스</h1>
                <Row className={styles.news_row}>
                    <Col xs={9}>
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                검색유형
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">제목</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">기사 내용</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col xs={3}>
                        <Form.Group style={{width:"300px", float: "right"}} controlId="formBasicPassword">
                            <Form.Control placeholder="검색..." />
                        </Form.Group>
                    </Col>
                </Row>

                <table className={styles.news_table}>
                    <thead>
                        <tr className={styles.news_thead_tr}>
                            <th style={{width: "100px", textAlignLast: "center"}}>번호</th>
                            <th style={{width: "100px", textAlignLast: "center"}}>카테고리</th>
                            <th style={{width: "700px", textAlignLast: "center"}}>제목</th>
                            <th style={{width: "120px", textAlignLast: "center"}}>작성자</th>
                            <th style={{width: "120px", textAlignLast: "center"}}>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
                
                <Pagination className={styles.news_pagination}>{items}</Pagination>
            </Container>
        </div>
    );
}

export default news;
