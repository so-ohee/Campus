import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'
import styles from "../../styles/Board/ModifyReview.module.css";
import { modifyArticle, campingBoardMore } from "../../function/axios";

function Modifyreview(props) {

    const [boardId, setBoardId] = useState(props.datas.boardId);
    const [title, setTitle] = useState(props.datas.title);
    const [content, setContent] = useState(props.datas.content);
    const [files, setFiles] = useState(props.datas.files);
    const [service, setService] = useState(props.datas.service);
    const [environment, setEnvironment] = useState(props.datas.environment);
    const [facility, setFacility] = useState(props.datas.facility);
    const [dataDto, setDataDto] = useState({});
    const [datas, setDatas] = useState([]);

    const ratingChanged1 = (newRating) => {
        setService(newRating/20);
    };

    const ratingChanged2 = (newRating) => {
        setEnvironment(newRating/20);
    };

    const ratingChanged3 = (newRating) => {
        setFacility(newRating/20);
    };

    const submitSign = () => {
        props.propFunction("상세")
    }

    const modify = () => {
        modifyArticle(dataDto, files);
    }

    const onChangeImg = async (e) => {
        e.preventDefault();
        if (e.target.files) {
            const uploadFile = e.target.files;
            setFiles(uploadFile);
        }
    }

    useEffect(() => {
        const newform = {
            "boardId": boardId,
            "title": title,
            "content": content,
        }
        setDataDto(newform);
    }, [boardId, title, content, files])
    
    useEffect(() => {
        campingBoardMore(props.datas.boardId).then((res) => {
            setDatas(res.data.board)
            setCampingId(res.data.board.boardId)
        });
    }, [])

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
                                <Col xs={7}>
                                    <Rating
                                        onClick={ratingChanged1}
                                        initialValue={service}
                                        size={30}
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
                                <Col xs={7}>
                                    <Rating
                                        onClick={ratingChanged2}
                                        initialValue={environment}
                                        size={30}
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
                                <Col xs={7}>
                                    <Rating
                                        onClick={ratingChanged3}
                                        initialValue={facility}
                                        size={30}
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

                {/* 사진 업로드 */}
                <div style={{marginBottom: "5%"}}>
                    <h5 className={styles.modifyreview_title2}>사진 업로드</h5>
                    <input type="file" id="profile-upload" accept="image/*" onChange={onChangeImg}/>
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
                    <Button variant="success" className={styles.modifyreview_button} onClick={modify}>수정</Button>
                    <Button variant="success" className={styles.modifyreview_button} onClick={submitSign}>뒤로가기</Button>
                </Row>
            </Container>
        </div>
    );
}

export default Modifyreview;