import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import styles from "../../styles/Board/ModifyReview.module.css";
import { modifyArticle, campingBoardMore } from "../../function/axios";

function Modifyreview(props) {

    const [campingId, setCampingId] = useState("");
    const [name, setName] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState(null);
    const [service, setService] = useState(null);
    const [environment, setEnvironment] = useState(null);
    const [facility, setFacility] = useState("");
    const [dataDto, setDataDto] = useState({});
    const [datas, setDatas] = useState([]);

    const ratingChanged1 = (newRating) => {
        setService(newRating);
    };

    const ratingChanged2 = (newRating) => {
        setEnvironment(newRating);
    };

    const ratingChanged3 = (newRating) => {
        setFacility(newRating);
    };

    const submitSign = () => {
        props.propFunction("상세")
    }

    const modify = () => {
        modifyArticle(dataDto, files);
    }

    useEffect(() => {
        const newform = {
            "userUid": localStorage.getItem("userUid"),
            "category": "후기",
            "title": title,
            "content": content,
            "campingId": props.datas,
            "environment": environment,
            "facility": facility,
            "service": service,
        }
        setDataDto(newform);
    }, [campingId, title, content, environment, facility, service])
    
    useEffect(() => {
        campingBoardMore(props.datas).then((res) => {
            setDatas(res.data.board)
        });
    }, [])

    // console.log(props.datas, title, content, environment, facility, service);
    console.log(datas)

    return (
        <div>
            <Container>
                <h1 className={styles.modifyreview_h1}>수정하기</h1>
                <div className={styles.modifyreview_div}>
                    <Row>
                        <Col xs={9}>
                            <Row>
                                <h3 style={{fontWeight: "bold"}}>{datas.facltNm}</h3>
                            </Row>
                            <Row style={{width: "300px", marginTop: "1%"}}>
                                <Col xs={4}>
                                    <p style={{fontWeight: "bold", marginTop: "2%"}}>서비스</p>
                                </Col>
                                <Col xs={1}>
                                    <p style={{fontWeight: "bold", marginTop: "2%"}}>{service}</p>
                                </Col>
                                <Col xs={7} style={{marginTop: "-3%"}}>
                                    <ReactStars
                                        count={5}
                                        value={datas.service}
                                        onChange={ratingChanged1}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </Col>
                            </Row>
                            <Row style={{width: "300px"}}>
                                <Col xs={4}>
                                    <p style={{fontWeight: "bold", marginTop: "2%"}}>환경</p>
                                </Col>
                                <Col xs={1}>
                                    <p style={{fontWeight: "bold", marginTop: "2%"}}>{environment}</p>
                                </Col>
                                <Col xs={7} style={{marginTop: "-3%"}}>
                                    <ReactStars
                                        count={5}
                                        value={datas.environment}
                                        onChange={ratingChanged2}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </Col>
                            </Row>
                            <Row style={{width: "300px"}}>
                                <Col xs={4}>
                                    <p style={{fontWeight: "bold", marginTop: "2%"}}>부대시설</p>
                                </Col>
                                <Col xs={1}>
                                    <p style={{fontWeight: "bold", marginTop: "2%"}}>{facility}</p>
                                </Col>
                                <Col xs={7} style={{marginTop: "-3%"}}>
                                    <ReactStars
                                        count={5}
                                        value={datas.facility}
                                        onChange={ratingChanged3}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={3}>
                            <Row>
                                {
                                    datas.updateTime == null ? 
                                        <p>{datas.name} {datas.createTime} 작성</p>
                                        : <p>{datas.name} {datas.updateTime} 수정</p>
                                }
                                
                            </Row>
                            <Row style={{justifyContent: "right", marginTop: "5%"}}>
                            </Row>
                        </Col>
                    </Row>
                </div>

                {/* 게시글 제목 */}
                <div style={{marginBottom: "2%"}}>
                    <h5 className={styles.modifyreview_title2}>제목</h5>
                    <input
                        className={styles.modifyreview_input}
                        type="text"
                        placeholder='제목을 입력하세요...'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* 게시글 입력창 */}
                <div style={{marginBottom: "2%"}}>
                    <textarea
                        className={styles.modifyreview_textarea}
                        type="text"
                        placeholder='내용을 입력하세요...'
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <Row className={styles.modifyreview_buttons}>
                    <Button variant="success" className={styles.modifyreview_button} onClick={modify}>작성</Button>
                    <Button variant="success" className={styles.modifyreview_button} onClick={submitSign}>뒤로가기</Button>
                </Row>
            </Container>
        </div>
    );
}

export default Modifyreview;