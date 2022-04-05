import { Container, Col, Row, Card, Pagination, Button } from "react-bootstrap";
import CampingCard from "../components/Common/CampingCard";
import styles from "../styles/Recommend/Recommend.module.css";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import  { filterResults }  from "../function/axios";


function Filter() {
    const router = useRouter();
    const [campings, setCampings] = useState([])
    const [page, setPage] = useState('')
    const [totalPage, setTotalPage] = useState('')
    const [pageList, setPageList] = useState([])
    const query_edit = 'filter/' + router.asPath.substring(7,)
    const query = query_edit.substring(0,query_edit.lastIndexOf('=')+1)

    useEffect(() => {
        filterResults(query_edit)
        .then((res) => {
            setCampings(res.data.results) 
            setPage(Number(res.data.page))
            setTotalPage(Number(res.data.totalPage))
            makeList(res.data.page,res.data.totalPage)
        })
    }, [router.asPath]);

    const makeList = (p, t) => {
        let lst = []
        const start = parseInt((p-1)/5)*5+1
        for (let i = start; i < Math.min(start+5,t+1); i++) {
            lst.push(i)
        }
        setPageList(lst)
    }

    const moveCamping = (camping_id) => {
        router.push(`/campingplace/${camping_id}`)
    }

    // 새로고침 또는 페이진 전환 시 초기 위치
    useEffect(() => {
        window.scrollTo(0, 500);
    }, [page]);

    return (
        <>
        <Container>
            {
                campings !== null ?
                    <Row>
                            {
                                campings.map((element, index) => {
                                    return (
                                        <Col sm key={index} style={{marginTop: "3%"}}>
                                            <CampingCard
                                                campingId={element.camping_id}
                                                firstImageUrl={element.first_image_url}
                                                title={element.faclt_nm}
                                                address={element.addr1}
                                                hashtag={element.thema_envrn_cl}
                                            />
                                        </Col>
                                    );
                                })
                            }
                    </Row> 
                    : 
                    <div style={{ height: "600px", textAlign: "-webkit-center", marginTop: "5%" }}>
                        <img className={styles.navi_pic} src="../../NoResult.png" style={{width: "30%", marginBottom: "2%"}}/>
                        <h2 style={{ fontWeight: "bold" }}>검색 결과가 없습니다.</h2>
                        <h4>검색하신 검색어를 다시 확인해주세요.</h4>
                    </div>
            }
            </Container>
            
            <Container style={{ marginTop: "2%", marginBottom: "2%" }}>
            {
                campings !== null ?
                <Pagination style={{justifyContent: "center"}}>
                    <Pagination.First 
                        disabled={page === 1}
                        onClick={() => router.push(`${query}${Math.max(1,pageList[0]-5)}`)}
                    />
                    <Pagination.Prev 
                        disabled={page === 1}
                        onClick={() => router.push(`${query}${page-1}`)}
                    />
                    {pageList.map((page_, idx) => (
                        <Pagination.Item
                            key={idx}
                            id={`page-${idx}`}
                            active={page_ === page}
                            onClick={() => router.push(`${query}${page_}`)}
                        >
                            {page_}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next 
                        disabled={page === totalPage}
                        onClick={() => router.push(`${query}${page+1}`)}
                    />
                    <Pagination.Last 
                        disabled={page === totalPage}
                        onClick={() => router.push(`${query}${Math.min(totalPage,pageList[0]+5)}`)}
                    />
                  </Pagination>
                  : 
                  null
            }
            </Container>
        </>
    );
}

export default Filter;
