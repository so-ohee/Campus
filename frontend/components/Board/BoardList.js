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
    const router = useRouter();

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
        campingBoard().then((res) => setDummy(res.data.board));
    }

    function categorysearch(category) {
        campingBoard_cate(category).then((res) => setDummy(res.data.board));
    }

    useEffect(() => {
        if (router.isReady) {
            campingBoard().then((res) => setDummy(res.data.board));
        }
    }, [router.isReady])
    
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

    console.log(dummy);

    return (
        <div>
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
                    <Button variant="success" style={{width: "100px"}} onClick={submitSign}>리뷰 작성</Button>
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
                            categorysearch(k);
                        }  
                    }}
                    className="mb-3">
                    <Tab eventKey="전체" title="전체">
                    </Tab>
                    <Tab eventKey="후기" title="후기">
                    </Tab>
                    <Tab eventKey="Q&A" title="Q&A">
                    </Tab>
                    <Tab eventKey="자유" title="자유">
                    </Tab>
                </Tabs>
            </Container>

            <Container style={{height: "600px", marginTop: "-0.7%"}}>
                <table className={styles.boardlist_table}>
                    <thead>
                        <tr className={styles.boardlist_thead_tr}>
                            <th style={{width: "100px", textAlignLast: "center"}}>번호</th>
                            <th style={{width: "100px", textAlignLast: "center"}}>카테고리</th>
                            <th style={{width: "700px", textAlignLast: "center"}}>제목</th>
                            <th style={{width: "120px", textAlignLast: "center"}}>작성자</th>
                            <th style={{width: "120px", textAlignLast: "center"}}>작성일</th>
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
                                                            <td style={{ width: "640px", paddingLeft: "3%" }}>{element.title}</td>
                                                            <td style={{ width: "150px", textAlignLast: "center" }}>{element.name}</td>
                                                            <td style={{ width: "200px", textAlignLast: "center" }}>{element.createTime}</td>
                                                        </tr>
                                                }
                                                {
                                                    element.category !== "후기" && 
                                                        <tr className={styles.boardlist_tbody_tr} onClick={() => {submitSign3(element.boardId), submitData(element.boardId)}}>
                                                            <td style={{ width: "100px", textAlignLast: "center" }}>{element.boardId}</td>
                                                            <td style={{ width: "150px", textAlignLast: "center" }}>{element.category}</td>
                                                            <td style={{ width: "640px", paddingLeft: "3%" }}>{element.title}</td>
                                                            <td style={{ width: "150px", textAlignLast: "center" }}>{element.name}</td>
                                                            <td style={{ width: "200px", textAlignLast: "center" }}>{element.createTime}</td>
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
                                                        <tr className={styles.boardlist_tbody_tr} onClick={() => {submitSign2(), submitData(element.boardId)}}>
                                                            <td style={{ width: "100px", textAlignLast: "center" }}>{element.boardId}</td>
                                                            <td style={{ width: "150px", textAlignLast: "center" }}>{element.category}</td>
                                                            <td style={{ width: "640px", paddingLeft: "3%" }}>{element.title}</td>
                                                            <td style={{ width: "150px", textAlignLast: "center" }}>{element.name}</td>
                                                            <td style={{ width: "200px", textAlignLast: "center" }}>{element.createTime}</td>
                                                        </tr>
                                                }
                                                {
                                                    element.category !== "후기" && 
                                                        <tr className={styles.boardlist_tbody_tr} onClick={() => {submitSign3(), submitData(element.boardId)}}>
                                                            <td style={{ width: "100px", textAlignLast: "center" }}>{element.boardId}</td>
                                                            <td style={{ width: "150px", textAlignLast: "center" }}>{element.category}</td>
                                                            <td style={{ width: "640px", paddingLeft: "3%" }}>{element.title}</td>
                                                            <td style={{ width: "150px", textAlignLast: "center" }}>{element.name}</td>
                                                            <td style={{ width: "200px", textAlignLast: "center" }}>{element.createTime}</td>
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
            <Pagination className={styles.boardlist_pagination}>{items}</Pagination>
        </div>
    );
}

export default Boardlist;
