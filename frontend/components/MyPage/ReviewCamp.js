import React from 'react';
import CampingCard from "../Common/CampingCard";
import { Col, Container, Pagination, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { ReviewList } from "../../function/axios";
import styles from "../../styles/MyPage/ReviewCamp.module.css";
import { useRouter } from 'next/router';

function Reviewcamp() {

    const router = useRouter();
    const [dummy, setDummy] = useState([]);

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState('')
    const [pageList, setPageList] = useState([])

    
    useEffect(() => {
        ReviewList(router.query.mypage, 1)
            .then((res) => {
                setDummy(res.data.board)
                setTotalPage(res.data.totalPage)
                makeList(1,res.data.totalPage)
            });
    }, [router.query]);

    const onSearch = (p) => {
        setPage(p)
        ReviewList(router.query.mypage,p)
        .then((res) => {
            console.log(res)
            if (res.data.board){
                setDummy(res.data.board)
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
    // console.log(dummy)
    return (
        <>
            <div className={styles.reviewcamp_div1}>
                <h2 style={{fontWeight: "bold"}}>작성한 게시물</h2>
            </div>

            <div className={styles.reviewcamp_main}>
                <Container style={{ height: "550px", marginTop: "-0.7%" }}>
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
                                                    <td onClick={() => router.push(`/mypage/detailreview/${element.boardId}`)} style={{ width: "640px", paddingLeft: "3%", cursor:'pointer' }}>{element.title}</td>
                                                    <td style={{ width: "150px", textAlignLast: "center" }}>{element.name}</td>
                                                    <td style={{ width: "200px", textAlignLast: "center" }}>{element.createTime}</td>
                                                </tr>
                                        }
                                        {
                                            element.category !== "후기" && 
                                                <tr className={styles.reviewcamp_tbody_tr}>
                                                    <td style={{ width: "100px", textAlignLast: "center" }}>{element.boardId}</td>
                                                    <td style={{ width: "150px", textAlignLast: "center" }}>{element.category}</td>
                                                    <td onClick={() => router.push(`/mypage/detailqnafree/${element.boardId}`)} style={{ width: "640px", paddingLeft: "3%", cursor:'pointer' }}>{element.title}</td>
                                                    <td style={{ width: "150px", textAlignLast: "center" }}>{element.name}</td>
                                                    <td style={{ width: "200px", textAlignLast: "center" }}>{element.createTime}</td>
                                                </tr>
                                        }
                                        </tbody>     
                                )})
                            ) : null
                        }
                    </table>
                    { dummy === undefined ? 
                        <div className={styles.reviewcamp_comment}>
                            <h1 style={{textAlign: "center"}}>작성한 리뷰가 없습니다.</h1>
                        </div>
                    : null
                    }
                </Container>
            </div>
            
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
        </>
    );
}

export default Reviewcamp;