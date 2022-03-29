import React, { useEffect, useState } from 'react';
import { Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import styles from "../styles/News/News.module.css";
import Pagination from 'react-bootstrap/Pagination';
import { Newscamp } from "../function/axios";

function news() {

    const [dummy, setDummy] = useState([]);
    const [page, setPage] = useState("");
    
    // 새로고침 또는 페이진 전환 시 초기 위치
    useEffect(() => {
        window.scrollTo(0, 500);
    }, [page]);

    useEffect(() => {
        Newscamp().then((res) => setDummy(res.data.news));
    }, [])
    
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

    console.log(dummy);

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
            </Container>

            <Container style={{height: "1000px", marginTop: "1%"}}>
                <table className={styles.news_table}>
                    <thead>
                        <tr className={styles.news_thead_tr}>
                            <th style={{width: "50px", textAlignLast: "center"}}>번호</th>
                            <th style={{width: "300px", textAlignLast: "center"}}>제목</th>
                            <th style={{width: "820px", textAlignLast: "center"}}>내용</th>
                            <th style={{width: "150px", textAlignLast: "center"}}>일자</th>
                        </tr>
                    </thead>
                    {
                        dummy !== null ? 
                        (
                            dummy.map((element, index) => {
                                return (
                                    <tbody key={index}>
                                        { 
                                            <tr className={styles.news_tbody_tr} onClick={() => window.open(`${element.link}`, '_black')}>
                                                <td style={{ width: "50px", textAlignLast: "center" }}>{index+1}</td>
                                                <td style={{ width: "300px", paddingLeft: "3%" }}>{element.title}</td>
                                                <td style={{ width: "870px", textAlignLast: "left", paddingLeft: "3%", paddingRight: "3%" }}>{element.description}</td>
                                                <td style={{ width: "100px", textAlignLast: "center" }}>{element.date}</td>
                                            </tr>
                                        }
                                    </tbody>
                                )
                            })
                        ) : null
                    }
                </table>
            </Container>
        </div>
    );
}

export default news;
