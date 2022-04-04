import React from 'react';
import CampingCard from "../Common/CampingCard";
import { Col, Container, Pagination, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { BookMarkList } from "../../function/axios";
import styles from "../../styles/MyPage/Bookmarkcamp.module.css";

function Bookmarkcamp() {

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
        BookMarkList(localStorage.getItem("userUid"))
            .then((res) => {setCampingplace(res.data.campsite), console.log(res)});
    }, []);
    
    return (
        <>
            <div className={styles.bookmarkcamp_div1}>
                <h2 style={{fontWeight: "bold"}}>북마크한 캠핑장</h2>
            </div>

            <div className={styles.bookmarkcamp_main}>
                <Container>
                    <Row>
                    {
                        campingplace !== undefined ? 
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
                                <div className={styles.bookmarkcamp_comment}>
                                    <h1 style={{textAlign: "center"}}>북마크한 캠핑장이 없습니다</h1>
                                </div>
                            )
                        }
                    </Row>
                    
                </Container>
            </div>
            
            {/* <Pagination className={styles.bookmarkcamp_pagination}>{items}</Pagination> */}
        </>
    );
}

export default Bookmarkcamp;