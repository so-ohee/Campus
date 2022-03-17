import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Nav, NavItem, NavLink, Row, Tab, Tabs} from 'react-bootstrap';
import styles from "/styles/Board/BoardList.module.css";
import Pagination from 'react-bootstrap/Pagination';

function boardlist(props) {

    const submitSign = () => {
        props.propFunction("작성")
    }
    const submitSign2 = () => {
        props.propFunction("상세")
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

    // Tab Menu
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <div>
            <Container>
                <h1 className={styles.boardlist_h1}>게시판</h1>
                <div className={styles.boardlist_button}>
                    <Row style={{ justifyContent: "right" }}>
                        <div className={styles.boardlist_title_content}>
                            <h6>제목/내용</h6>
                        </div>
                        <Form.Group style={{width:"300px", float: "right"}} controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="success" style={{width: "100px"}} onClick={submitSign}>리뷰 작성</Button>
                    </Row>
                </div>

                <div style={{marginBottom: "-1.3%"}}>
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                        <Tab style={{width: "500px"}} eventKey="전체" title="전체">
                            
                        </Tab>
                        <Tab eventKey="Q&A" title="Q&A">
                            
                        </Tab>
                        <Tab eventKey="자유" title="자유">
                            
                        </Tab>
                        <Tab eventKey="후기" title="후기">
                            
                        </Tab>
                        <Tab eventKey="뉴스" title="뉴스">
                            
                        </Tab>
                    </Tabs>
                </div>

                <div className={styles.boardlist_table}>
                    <table>
                        <thead>
                            <tr className={styles.boardlist_thead_tr}>
                                <th style={{width: "100px", textAlignLast: "center"}}>번호</th>
                                <th style={{width: "800px", textAlignLast: "center"}}>제목</th>
                                <th style={{width: "120px", textAlignLast: "center"}}>작성자</th>
                                <th style={{width: "120px", textAlignLast: "center"}}>작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={styles.boardlist_tbody_tr} onClick={submitSign2}>
                                <td style={{width: "150px", textAlignLast: "center"}}>1</td>
                                <td style={{width: "720px"}}>첫번째 게시글입니다.</td>
                                <td style={{width: "120px", textAlignLast: "center"}}>박주한</td>
                                <td style={{width: "150px", textAlignLast: "center"}}>2020-10-25</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination className={styles.boardlist_pagination}>{items}</Pagination>
            </Container>
        </div>
    );
}

export default boardlist;
