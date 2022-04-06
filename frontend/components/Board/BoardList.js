import React, { useEffect, useState }  from 'react';
import { Button, Container, Form, Row, Tab, Tabs} from 'react-bootstrap';
import styles from "../../styles/Board/BoardList.module.css";
import Pagination from 'react-bootstrap/Pagination';
import { campingBoard, searchArticle, campingBoard_cate } from "../../function/axios";
import { useRouter } from 'next/router';

function Boardlist(props) {

    const [dummy, setDummy] = useState([]);
    const [serachdummy, setSearchdummy] = useState(null);
    const [title, setTitle] = useState("");
    const [key, setKey] = useState('전체');
    const [userid, setUserid] = useState("");
    const router = useRouter();

    // 페이지네이션
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState('')
    const [pageList, setPageList] = useState([])

    const submitSign = () => {
        props.propFunction("작성")
    }

    const submitSign2 = (boardId) => {
        router.push(`board/detailreview/${boardId}`);
    }

    function submitData(datas) {
        props.propData(datas)
    }

    const submitSign3 = (boardId) => {
        props.propFunction("자유상세")
        router.push(`board/detailqnafree/${boardId}`);
    }

    function categorymain() {
        campingBoard(1).then((res) => {
            setPage(1)
            setDummy(res.data.board)
            makeList(1,res.data.totalPage)
            setTotalPage(res.data.totalPage)
        });
    }

    function categorysearch(category, page) {
        campingBoard_cate(category, page).then((res) => {
            // console.log(res)
            setPage(1)
            setDummy(res.data.board)
            makeList(1,res.data.totalPage)
            setTotalPage(res.data.totalPage)
        });
    }

    useEffect(() => {
        if (router.isReady) {
            campingBoard(1).then((res) => {
                // console.log(res)   
                setDummy(res.data.board)
                makeList(1,res.data.totalPage)
                setTotalPage(res.data.totalPage)
            });
            setUserid(localStorage.getItem('userUid'))
        }
    }, [router.isReady])
    
    const onSearch = (p) => {
        setPage(p)
        if (key === '전체'){
            campingBoard(p)
            .then((res) => {
                if (res.data.board){
                    setDummy(res.data.board)
                    setTotalPage(res.data.totalPage)
                    makeList(p,res.data.totalPage)
                }else{
                    setDummy([])
                }
            })
        }else{
            campingBoard_cate(key, p)
            .then((res) => {
                if (res.data.board){
                    setDummy(res.data.board)
                    setTotalPage(res.data.totalPage)
                    makeList(p,res.data.totalPage)
                }else{
                    setDummy([])
                }
            })
        }
    }

    // Pagination
    const makeList = (p, t) => {
        let lst = []
        const start = parseInt((p-1)/5)*5+1
        for (let i = start; i < Math.min(start+5,t+1); i++) {
            lst.push(i)
        }
        setPageList(lst)
    }

    // 새로고침 또는 페이진 전환 시 초기 위치
    useEffect(() => {
        window.scrollTo(0, 500);
    }, []);

    return (
        <div>
            <Container style={{marginTop: "2%", textAlign: "-webkit-right"}}>
                {
                    userid !== undefined ?
                        (
                            <Button variant="success" style={{width: "100px"}} onClick={submitSign}>작성</Button>
                        ) : 
                        (
                            null
                        )
                }
            </Container>

            <Container >
                <h1 className={styles.boardlist_h1}>게시판</h1>

                <Row style={{ justifyContent: "right" }}>
                    <div className={styles.boardlist_title_content}>
                        <p style={{ textAlignLast: "center" }}>제목</p>
                    </div>
                    <input
                        className={styles.boardlist_input}
                        type="text"
                        value={title}
                        placeholder='캠핑장 이름을 입력하세요...'
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                searchArticle(e.target.value)
                                    .then((res) => setSearchdummy(res.data.board))
                                    .catch((err) => {
                                        console.log("다시 검색해주세요");
                                    });
                            }
                        }}
                    />
                    
                    
                </Row>

                <Tabs
                    style={{ width: "500px" }}
                    defaultActiveKey="전체"
                    id="uncontrolled-tab-example"
                    activeKey={key}
                    onSelect={(k) => {
                        if (k === "전체") {
                            setKey(k);
                            categorymain();
                        } else {
                            setKey(k);
                            categorysearch(k,1);
                        }  
                    }}
                    className="mb-3">
                    <Tab eventKey="전체" title="전체">
                    </Tab>
                    <Tab eventKey="후기" title="후기">
                    </Tab>
                    <Tab eventKey="Q%26A" title="Q&A">
                    </Tab>
                    <Tab eventKey="자유" title="자유">
                    </Tab>
                </Tabs>
            </Container>

            <Container style={{ height: "600px", marginTop: "-0.7%" }}>
                <table className={styles.boardlist_table}>
                    <thead>
                        <tr className={styles.boardlist_thead_tr}>
                            <th style={{width: "100px", textAlignLast: "center"}}>번호</th>
                            <th style={{width: "100px", textAlignLast: "center"}}>카테고리</th>
                            <th style={{width: "600px", textAlignLast: "center"}}>제목</th>
                            <th style={{width: "120px", textAlignLast: "center"}}>작성자</th>
                            <th style={{width: "120px", textAlignLast: "center"}}>작성일</th>
                            <th style={{width: "100px", textAlignLast: "center"}}>조회수</th>
                        </tr>
                    </thead>
                    {
                        serachdummy == null ?
                            (
                                dummy !== undefined ? 
                                (
                                    dummy.map((element, index) => {
                                        return (
                                            <tbody key={index}>
                                                {
                                                    element.category === "후기" && 
                                                        <tr className={styles.boardlist_tbody_tr} onClick={() => {submitSign2(element.boardId), submitData(element.boardId)}}>
                                                            <td style={{ width: "100px", textAlignLast: "center" }}>{element.boardId}</td>
                                                            <td style={{ width: "150px", textAlignLast: "center" }}>{element.category}</td>
                                                            <td style={{ width: "540px", paddingLeft: "3%"}}>{element.title}</td>
                                                            <td style={{ width: "150px", textAlignLast: "center" }}>{element.name}</td>
                                                            <td style={{ width: "200px", textAlignLast: "center" }}>{element.createTime}</td>
                                                            <td style={{ width: "100px", textAlignLast: "center" }}>{element.hit}</td>
                                                        </tr>
                                                }
                                                {
                                                    element.category !== "후기" && 
                                                        <tr className={styles.boardlist_tbody_tr} onClick={() => {submitSign3(element.boardId), submitData(element.boardId)}}>
                                                            <td style={{ width: "100px", textAlignLast: "center" }}>{element.boardId}</td>
                                                            <td style={{ width: "150px", textAlignLast: "center" }}>{element.category}</td>
                                                            <td style={{ width: "540px", paddingLeft: "3%" }}>{element.title}</td>
                                                            <td style={{ width: "150px", textAlignLast: "center" }}>{element.name}</td>
                                                            <td style={{ width: "200px", textAlignLast: "center" }}>{element.createTime}</td>
                                                            <td style={{ width: "100px", textAlignLast: "center" }}>{element.hit}</td>
                                                        </tr>
                                                }
                                            </tbody>
                                        )
                                    })
                                ) : null
                            ) :
                            (
                                serachdummy !== null ? 
                                (
                                    serachdummy.map((element, index) => {
                                        return (
                                            <tbody key={index}>
                                                {
                                                    element.category === "후기" && 
                                                        <tr className={styles.boardlist_tbody_tr} onClick={() => {submitSign2(element.boardId), submitData(element.boardId)}}>
                                                            <td style={{ width: "100px", textAlignLast: "center" }}>{element.boardId}</td>
                                                            <td style={{ width: "150px", textAlignLast: "center" }}>{element.category}</td>
                                                            <td style={{ width: "540px", paddingLeft: "3%" }}>{element.title}</td>
                                                            <td style={{ width: "150px", textAlignLast: "center" }}>{element.name}</td>
                                                            <td style={{ width: "200px", textAlignLast: "center" }}>{element.createTime}</td>
                                                            <td style={{ width: "100px", textAlignLast: "center" }}>{element.hit}</td>
                                                        </tr>
                                                }
                                                {
                                                    element.category !== "후기" && 
                                                        <tr className={styles.boardlist_tbody_tr} onClick={() => {submitSign3(element.boardId), submitData(element.boardId)}}>
                                                            <td style={{ width: "100px", textAlignLast: "center" }}>{element.boardId}</td>
                                                            <td style={{ width: "150px", textAlignLast: "center" }}>{element.category}</td>
                                                            <td style={{ width: "540px", paddingLeft: "3%" }}>{element.title}</td>
                                                            <td style={{ width: "150px", textAlignLast: "center" }}>{element.name}</td>
                                                            <td style={{ width: "200px", textAlignLast: "center" }}>{element.createTime}</td>
                                                            <td style={{ width: "100px", textAlignLast: "center" }}>{element.hit}</td>
                                                        </tr>
                                                }
                                            </tbody>
                                        )
                                    })
                                ) : null
                            )
                    }
                    
                </table>
            </Container>

            <Pagination className={styles.boardlist_pagination}>
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

export default Boardlist;
