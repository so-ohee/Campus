import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'
import styles from "../../../styles/Board/ModifyReview.module.css";
import { modifyArticle, campingBoardMore } from "../../../function/axios";
import { useRouter } from 'next/router';

function Modifyreview() {

    const router = useRouter();
    const [boardId, setBoardId] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [files, setFiles] = useState();
    const [service, setService] = useState();
    const [environment, setEnvironment] = useState();
    const [facility, setFacility] = useState();
    const [dataDto, setDataDto] = useState({});
    const [datas, setDatas] = useState([]);

    const submitSign = () => {
        router.push('/board')
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
        if (router.isReady) {
            const newform = {
                "boardId": boardId,
                "title": title,
                "content": content,
            }
            setDataDto(newform);
        }
    }, [router.isReady, boardId, title, content, files])

    // 새로고침 또는 페이진 전환 시 초기 위치
    useEffect(() => {
        window.scrollTo(0, 500);
    }, []);
    
    useEffect(() => {
        if (router.isReady) {
            campingBoardMore(router.query.modifyreview).then((res) => {
                setBoardId(res.data.board.boardId)
                setTitle(res.data.board.title)
                setContent(res.data.board.content)
                setFiles(res.data.board.profile)
                setService(res.data.board.service)
                setEnvironment(res.data.board.environment)
                setFacility(res.data.board.facility)
                setDatas(res.data.board)
            });
        }
    }, [router.isReady])

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
                            {
                                datas.facltNm !== undefined ?
                                    (
                                        <Row style={{width: "300px", marginTop: "1%"}}>
                                            <Col xs={4}>
                                                <p style={{fontWeight: "bold", marginTop: "2%"}}>서비스</p>
                                            </Col>
                                            <Col xs={1}>
                                                <p style={{fontWeight: "bold", marginTop: "2%"}}>{service}</p>
                                            </Col>
                                            <Col xs={7}>
                                                <Rating
                                                    initialValue={service}
                                                    size={30}
                                                    allowHover={false}
                                                />
                                            </Col>
                                        </Row>
                                    ) : null
                            }
                            {
                                datas.facltNm !== undefined ?
                                    (
                                        <Row style={{width: "300px"}}>
                                            <Col xs={4}>
                                                <p style={{fontWeight: "bold", marginTop: "2%"}}>환경</p>
                                            </Col>
                                            <Col xs={1}>
                                                <p style={{fontWeight: "bold", marginTop: "2%"}}>{environment}</p>
                                            </Col>
                                            <Col xs={7}>
                                                <Rating
                                                    initialValue={environment}
                                                    size={30}
                                                    allowHover={false}
                                                />
                                            </Col>
                                        </Row>
                                    ) : null
                            }
                            {
                                datas.facltNm !== undefined ?
                                    (
                                        <Row style={{width: "300px"}}>
                                            <Col xs={4}>
                                                <p style={{fontWeight: "bold", marginTop: "2%"}}>부대시설</p>
                                            </Col>
                                            <Col xs={1}>
                                                <p style={{fontWeight: "bold", marginTop: "2%"}}>{facility}</p>
                                            </Col>
                                            <Col xs={7}>
                                                <Rating
                                                    initialValue={facility}
                                                    size={30}
                                                    allowHover={false}
                                                />
                                            </Col>
                                        </Row>
                                    ) : null
                            }
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* 게시글 입력창 */}
                <div style={{marginBottom: "2%"}}>
                    <textarea
                        className={styles.modifyreview_textarea}
                        type="text"
                        placeholder='내용을 입력하세요...'
                        value={content}
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