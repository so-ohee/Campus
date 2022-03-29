import React, { useEffect, useState }  from 'react';
import { Button, Container, Form, Row, Tab, Tabs} from 'react-bootstrap';
import styles from "../../styles/Board/BoardList.module.css";
import Pagination from 'react-bootstrap/Pagination';
import { campingBoard } from "../../function/axios";

function Boardlist(props) {

    const submitSign = () => {
        props.propFunction("작성")
    }

    const submitSign2 = () => {
        props.propFunction("상세")
        
    }

    function submitData(datas) {
        props.propData(datas)
    }

    const submitSign3 = () => {
        props.propFunction("자유상세")
    }

    const [dummy, setDummy] = useState([]);

    useEffect(() => {
        campingBoard().then((res) => setDummy(res.data.board));
    }, [])
    
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
                        <p>제목/내용</p>
                    </div>
                    <Form.Group style={{width:"300px", float: "right"}} controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="success" style={{width: "100px"}} onClick={submitSign}>리뷰 작성</Button>
                </Row>

                <Tabs style={{width: "500px"}} defaultActiveKey="전체" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="전체" title="전체">
                        
                    </Tab>
                    <Tab eventKey="후기" title="후기">
                        
                    </Tab>
                    <Tab eventKey="Q&A" title="Q&A">
                        
                    </Tab>
                    <Tab eventKey="자유" title="자유">
                        
                    </Tab>
                    <Tab eventKey="뉴스" title="뉴스">
                        
                    </Tab>
                </Tabs>
            </Container>

            <Container style={{height: "700px", marginTop: "-0.7%"}}>
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
                    {/* <tbody> */}
                        {
                            dummy !== null ? 
                            (
                                dummy.map((element, index) => {
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
                        }
                    {/* </tbody> */}
                </table>
            </Container>
            <Pagination className={styles.boardlist_pagination}>{items}</Pagination>
        </div>
    );
}

export default Boardlist;
