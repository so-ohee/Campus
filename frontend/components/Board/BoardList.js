import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import styles from "/styles/Board/BoardList.module.css";

function campingplace() {

    const [selected, setSelected] = useState("1");

    return (
        
        <div>
            <Container>
                <h1 className={styles.boardlist_h1}>실시간 캠핑 소식</h1>
                <table className={styles.boardlist_table}>
                    <thead>
                        <tr className={styles.boardlist_tr}>
                            <th style={{width: "100px", textAlignLast: "center"}}>번호</th>
                            <th style={{width: "800px", textAlignLast: "center"}}>제목</th>
                            <th style={{width: "120px", textAlignLast: "center"}}>작성자</th>
                            <th style={{width: "120px", textAlignLast: "center"}}>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{width: "150px", textAlignLast: "center"}}>1</td>
                            <td style={{width: "720px",}}>첫번째 게시글입니다.</td>
                            <td style={{width: "120px", textAlignLast: "center"}}>박주한</td>
                            <td style={{width: "150px", textAlignLast: "center"}}>2020-10-25</td>
                        </tr>
                    </tbody>
                </table>
            </Container>
        </div>
    );
}

export default campingplace;
