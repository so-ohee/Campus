import React from 'react';
import CampingCard from "/components/common/CampingCard";
import { Col, Container, Pagination, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { viewCamping } from "../../function/axios";
import styles from "/styles/MyPage/VisitedCamp.module.css";

function Visitedcamp() {

    const [title, setTitle] = useState("");
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
        viewCamping()
            .then(function (response) {
                setTitle(response.data.season);
                setCampingplace(response.data.seasonList);
    });
    }, []);

    return (
        <>
            <div className={styles.visitedcamp_div1}>
                <h2 style={{fontWeight: "bold"}}>방문한 캠핑장</h2>
            </div>

            <div className={styles.visitedcamp_main}>
                <Container>
                    <Row>
                        {campingplace.map((element, index) => {
                            return (
                            <Col sm key={index}>
                                <CampingCard
                                title={element.facltNm}
                                address={element.addr1}
                                hashtag={element.themaEnvrnCl}
                                />
                            </Col>
                            );
                        })}
                    </Row>
                    
                </Container>
            </div>
            
            <div className={styles.visitedcamp_main}>
                <Container>
                    <Row>
                        {campingplace.map((element, index) => {
                            return (
                            <Col sm key={index}>
                                <CampingCard
                                title={element.facltNm}
                                address={element.addr1}
                                hashtag={element.themaEnvrnCl}
                                />
                            </Col>
                            );
                        })}
                    </Row>
                    
                </Container>
            </div>

            <Pagination className={styles.visitedcamp_pagination}>{items}</Pagination>
        </>
    );
}

export default Visitedcamp;