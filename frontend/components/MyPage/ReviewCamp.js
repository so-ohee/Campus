import React from 'react';
import CampingCard from "../Common/CampingCard";
import { Col, Container, Pagination, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { ReviewList } from "../../function/axios";
import styles from "../../styles/MyPage/ReviewCamp.module.css";

function Reviewcamp() {

    const [dummy, setDummy] = useState([]);

    // Pagination
    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
            {number}
            </Pagination.Item>,
        );
    }
    
    useEffect(() => {
        ReviewList(localStorage.getItem("userUid"))
            .then((res) => setDummy(res.data.board));
    }, []);

    return (
        <>
            <div className={styles.reviewcamp_div1}>
                <h2 style={{fontWeight: "bold"}}>리뷰 쓴 캠핑장</h2>
            </div>

            <div className={styles.reviewcamp_main}>
                <Container style={{ height: "700px", marginTop: "-0.7%" }}>
                    <table className={styles.reviewcamp_table}>
                        <thead>
                            <tr className={styles.reviewcamp_thead_tr}>
                                <th style={{width: "100px", textAlignLast: "center"}}>번호</th>
                                <th style={{width: "100px", textAlignLast: "center"}}>카테고리</th>
                                <th style={{width: "700px", textAlignLast: "center"}}>제목</th>
                                <th style={{width: "120px", textAlignLast: "center"}}>작성자</th>
                                <th style={{width: "120px", textAlignLast: "center"}}>작성일</th>
                            </tr>
                        </thead>
                        {
                        dummy !== undefined ? 
                        (
                            dummy.map((element, index) => {
                                return (
                                        <tbody key={index}>
                                        {
                                            element.category === "후기" && 
                                                <tr className={styles.reviewcamp_tbody_tr}>
                                                    <td style={{ width: "100px", textAlignLast: "center" }}>{element.boardId}</td>
                                                    <td style={{ width: "150px", textAlignLast: "center" }}>{element.category}</td>
                                                    <td style={{ width: "640px", paddingLeft: "3%" }}>{element.title}</td>
                                                    <td style={{ width: "150px", textAlignLast: "center" }}>{element.name}</td>
                                                    <td style={{ width: "200px", textAlignLast: "center" }}>{element.createTime}</td>
                                                </tr>
                                        }
                                        {
                                            element.category !== "후기" && 
                                                <tr className={styles.reviewcamp_tbody_tr}>
                                                    <td style={{ width: "100px", textAlignLast: "center" }}>{element.boardId}</td>
                                                    <td style={{ width: "150px", textAlignLast: "center" }}>{element.category}</td>
                                                    <td style={{ width: "640px", paddingLeft: "3%" }}>{element.title}</td>
                                                    <td style={{ width: "150px", textAlignLast: "center" }}>{element.name}</td>
                                                    <td style={{ width: "200px", textAlignLast: "center" }}>{element.createTime}</td>
                                                </tr>
                                        }
                                        </tbody>     
                                )})
                            ) : 
                            (
                                <div className={styles.reviewcamp_comment}>
                                    <h1 style={{textAlign: "center"}}>작성한 리뷰가 없습니다</h1>
                                </div>
                            )
                        }
                    </table>
                </Container>
            </div>

            <Pagination className={styles.reviewcamp_pagination}>{items}</Pagination>
        </>
    );
}

export default Reviewcamp;