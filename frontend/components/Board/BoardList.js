import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import styles from "/styles/Board/BoardList.module.css";
import Pagination from 'react-bootstrap/Pagination'

function boardlist(props) {

    const submitSign = () => {
        props.propFunction("작성")
    }
    const submitSign2 = () => {
        props.propFunction("상세")
    }
    
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
                <h1 className={styles.boardlist_h1}>실시간 캠핑 소식</h1>
                <div className={styles.boardlist_button}>
                    <Button variant="success" onClick={submitSign}>리뷰 작성</Button>
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
