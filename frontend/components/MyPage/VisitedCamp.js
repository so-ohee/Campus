import React from 'react';
import CampingCard from "../Common/CampingCard";
import { Col, Container, Pagination, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { VisitList } from "../../function/axios";
import styles from "../../styles/MyPage/VisitedCamp.module.css";

function Visitedcamp() {

    const [campingplace, setCampingplace] = useState([]);

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
    
    useEffect(() => {
        VisitList(localStorage.getItem("userUid"))
            .then((res) => setCampingplace(res.data.campsite));
    }, []);

    return (
        <>
            <div className={styles.visitedcamp_div1}>
                <h2 style={{fontWeight: "bold"}}>방문한 캠핑장</h2>
            </div>

            <div className={styles.visitedcamp_main}>
                <Container>
                    <Row>
                        {
                            campingplace !== null ? 
                                (
                                    campingplace.map((element, index) => {
                                    return (
                                    <Col sm key={index} style={{marginBottom: "5%"}}>
                                            <CampingCard
                                                campingId={element.campingId}
                                                title={element.facltNm}
                                                address={element.addr1}
                                                hashtag={element.themaEnvrnCl}
                                            />
                                    </Col>
                                );
                            })) : 
                                (
                                    <div className={styles.visitedcamp_comment}>
                                        <h1 style={{textAlign: "center"}}>방문한 캠핑장이 없습니다</h1>
                                    </div>
                                )
                        }
                    </Row>
                    
                </Container>
            </div>
            
            {/* <Pagination className={styles.visitedcamp_pagination}>{items}</Pagination> */}
        </>
    );
}

export default Visitedcamp;