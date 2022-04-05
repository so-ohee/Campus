import React from 'react';
import CampingCard from "../Common/CampingCard";
import { Col, Container, Pagination, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { VisitList } from "../../function/axios";
import styles from "../../styles/MyPage/VisitedCamp.module.css";
import { Map, MapMarker } from "react-kakao-maps-sdk"

function Visitedcamp() {

    const [campingplace, setCampingplace] = useState([]);

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState('')
    const [pageList, setPageList] = useState([])

    // 지도
    const [isOpen, setIsOpen] = useState(false)

    
    useEffect(() => {
        VisitList(localStorage.getItem("userUid"),1)
            .then((res) => {
                setCampingplace(res.data.campsite)
                setTotalPage(res.data.totalPage)
                makeList(1,res.data.totalPage)
            });
    }, []);


    const onSearch = (p) => {
        setPage(p)
        VisitList(localStorage.getItem("userUid"),p)
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
            <div className={styles.visitedcamp_div1}>
                <h2 style={{fontWeight: "bold"}}>방문한 캠핑장</h2>
            </div>

            <div className={styles.visitedcamp_main}>
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
                                    <div className={styles.visitedcamp_comment}>
                                        <h1 style={{textAlign: "center"}}>방문한 캠핑장이 없습니다.</h1>
                                    </div>
                                )
                        }
                    </Row>
                </Container>
            </div>
            
            <Pagination className={styles.visitedcamp_pagination}>
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

                  <div>
                    <Map // 지도를 표시할 Container
                        center={{
                            // 지도의 중심좌표
                            lat: 36,
                            lng: 127,
                        }}
                        style={{
                            // 지도의 크기
                            width: "100%",
                            height: "600px",
                        }}
                        level={13} // 지도의 확대 레벨
                    >
                        <MapMarker 
                            position={{
                                lat: 36,
                                lng: 127,
                            }}
                            clickable={true}
                            // onClick={() => window.open(`https://map.kakao.com/link/to/${campingName},${y},${x}`, '_blank')}
                            onMouseOver={
                                () => setIsOpen(true)
                            }
                            onMouseOut={
                                () => setIsOpen(false)
                            }
                        >
                            {isOpen && <div className="fw-bold" style={{ padding: "5px", color: "#000" }}>123</div>}
                        </MapMarker>
                    </Map>
                </div>
        </>
    );
}

export default Visitedcamp;