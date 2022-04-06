import React, { useEffect, useState } from 'react';
import { Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import styles from "../styles/News/News.module.css";
import Pagination from 'react-bootstrap/Pagination';
import { Newscamp } from "../function/axios";

function news() {

    const [dummy, setDummy] = useState([]);

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState('')
    const [pageList, setPageList] = useState([])
    
    // 새로고침 또는 페이진 전환 시 초기 위치
    useEffect(() => {
        window.scrollTo(0, 500);
    }, [page]);

    useEffect(() => {
        Newscamp(1).then((res) => {
            setDummy(res.data.news)
            setTotalPage(res.data.totalPage)
            makeList(1,res.data.totalPage)
        });
    }, [])
    
    const onSearch = (p) => {
        setPage(p)
        Newscamp(p)
        .then((res) => {
            // console.log(res)
            if (res.data.news){
                setDummy(res.data.news)
                setTotalPage(res.data.totalPage)
                makeList(p,res.data.totalPage)
            }else{
                setDummy([])
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
        <div>
            <Container>
                <h1 className={styles.news_h1}>캠핑 뉴스</h1>
            </Container>

            <Container style={{height: "1000px", marginTop: "1%"}}>
                <table className={styles.news_table}>
                    <thead>
                        <tr className={styles.news_thead_tr}>
                            <th style={{width: "50px", textAlignLast: "center"}}>번호</th>
                            <th style={{width: "300px", textAlignLast: "center"}}>제목</th>
                            <th style={{width: "820px", textAlignLast: "center"}}>내용</th>
                            <th style={{width: "150px", textAlignLast: "center"}}>일자</th>
                        </tr>
                    </thead>
                    {
                        dummy !== null ? 
                        (
                            dummy.map((element, index) => {
                                return (
                                    <tbody key={index}>
                                        { 
                                            <tr className={styles.news_tbody_tr} onClick={() => window.open(`${element.link}`, '_black')}>
                                                <td style={{ width: "50px", textAlignLast: "center" }}>{index+1}</td>
                                                <td style={{ width: "300px", paddingLeft: "3%" }}>{element.title}</td>
                                                <td style={{ width: "870px", textAlignLast: "left", paddingLeft: "3%", paddingRight: "3%" }}>{element.description}</td>
                                                <td style={{ width: "100px", textAlignLast: "center" }}>{element.date}</td>
                                            </tr>
                                        }
                                    </tbody>
                                )
                            })
                        ) : null
                    }
                </table>
            </Container>

            <Pagination className={styles.reviewcamp_pagination}>
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

        </div>
    );
}

export default news;
