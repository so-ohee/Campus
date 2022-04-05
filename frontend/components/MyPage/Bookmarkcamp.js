import React from 'react';
import CampingCard from "../Common/CampingCard";
import { Col, Container, Pagination, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { BookMarkList } from "../../function/axios";
import styles from "../../styles/MyPage/Bookmarkcamp.module.css";

function Bookmarkcamp() {

    const [campingplace, setCampingplace] = useState([]);

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState('')
    const [pageList, setPageList] = useState([])

    
    useEffect(() => {
        BookMarkList(localStorage.getItem("userUid"), 1)
            .then((res) => {
                setCampingplace(res.data.campsite)
                setTotalPage(res.data.totalPage)
                makeList(1,res.data.totalPage)
            });
    }, []);

    const onSearch = (p) => {
        setPage(p)
        BookMarkList(localStorage.getItem("userUid"),p)
        .then((res) => {
            console.log(res)
            if (res.data.campsite){
                setCampingplace(res.data.campsite)
                setTotalPage(res.data.totalPage)
                makeList(p,res.data.totalPage)
            }else{
                setCampingplace([])
            }
        })
    }

    const makeList = (p, t) => {
        let lst = []
        const start = parseInt((p-1)/5)*5+1
        for (let i = start; i < Math.min(start+5,t+1); i++) {
            lst.push(i)
        }
        setPageList(lst)
    }

    
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
            

            <Pagination className={styles.bookmarkcamp_pagination}>
                    <Pagination.First 
                        disabled={page === 1}
                        onClick={() => onSearch(Math.max(1,pageList[0]-5))}
                    />
                    <Pagination.Prev 
                        disabled={page === 1}
                        onClick={() => onSearch(page-1)}
                    />
                    {pageList.map((page_, idx) => (
                        <Pagination.Item
                            key={idx}
                            id={`page-${idx}`}
                            active={page_ === page}
                            onClick={() => onSearch(page_)}
                        >
                            {page_}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next 
                        disabled={page === totalPage || totalPage === undefined}
                        onClick={() => onSearch(page+1)}
                    />
                    <Pagination.Last 
                        disabled={page === totalPage || totalPage === undefined}
                        onClick={() => onSearch(Math.min(totalPage,pageList[0]+5))}
                    />
                  </Pagination>
            {/* <Pagination className={styles.bookmarkcamp_pagination}>{items}</Pagination> */}
        </>
    );
}

export default Bookmarkcamp;