import React from 'react';
import CampingCard from "../Common/CampingCard";
import { Col, Container, Pagination, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { VisitList, visit } from "../../function/axios";
import styles from "../../styles/MyPage/VisitedCamp.module.css";
import { Map, MapMarker } from "react-kakao-maps-sdk"
import { useRouter } from 'next/router';

function Visitedcamp() {

    const router = useRouter();
    const [campingplace, setCampingplace] = useState([]);

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState('')
    const [pageList, setPageList] = useState([])

    // 지도
    const [isOpen, setIsOpen] = useState(false)
    const [campings, setCampings] = useState([])
    let lst = []

    
    useEffect(() => {
        VisitList(localStorage.getItem("userUid"),1)
            .then((res) => {
                setCampingplace(res.data.campsite)
                setTotalPage(res.data.totalPage)
                makeList(1,res.data.totalPage)
            });
        visit(localStorage.getItem("userUid"))
            .then((res) => {
                setCampings(res.data)
                for (let i = 0; i < res.data.length; i++) {
                    lst.push(false)
                }
                setIsOpen(lst)
            })
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
            
            <div style={{textAlign: "-webkit-center", marginTop: "3%", marginBottom: "3%"}}>
                <Map // 지도를 표시할 Container
                    center={{
                        // 지도의 중심좌표
                        lat: 36.3,
                        lng: 127.8,
                    }}
                    style={{
                        // 지도의 크기
                        width: "92%",
                        height: "500px",
                        borderRadius: "2%"
                    }}
                    level={13} // 지도의 확대 레벨
                >
                {
                    campings.map((data, idx) => (
                    <MapMarker 
                        key={idx}
                        position={{
                            lat: data.map_y,
                            lng: data.map_x,
                        }}
                        clickable={true}
                        onClick={() => router.push(`/campingplace/${data.camping_id}`)}
                        onMouseOver={
                            () => setIsOpen({
                                ...isOpen,
                                [idx] : true
                            })
                        }
                        onMouseOut={
                            () => setIsOpen({
                                ...isOpen,
                                [idx] : false
                            })
                        }
                    >
                        {isOpen[idx] && <div className="fw-bold" style={{ padding: "5px", color: "#000" }}>{data.faclt_nm}</div>}
                    </MapMarker>
                ))}
                </Map>
            </div>

            <hr />

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
                
        </>
    );
}

export default Visitedcamp;