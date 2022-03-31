import React, { useEffect, useState } from 'react';
import { Button, Col, Dropdown, Row } from 'react-bootstrap';
import styles from "../../styles/Board/WriteReview.module.css";
import { Rating } from 'react-simple-star-rating'
import { searchCamp, sendArticle } from "../../function/axios";

function Writereview(props) {

    const [campingId, setCampingId] = useState("");
    const [name, setName] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState(null);
    const [service, setService] = useState(null);
    const [environment, setEnvironment] = useState(null);
    const [facility, setFacility] = useState(null);
    const [dataDto, setDataDto] = useState({});
    const [dummy, setDummy] = useState([]);
    
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
        document.location.href = "/board";
    }

    const onChangeImg = async (e) => {
        e.preventDefault();
        if (e.target.files) {
            const uploadFile = e.target.files;
            setFiles(uploadFile);
        }
    }

    const modify = () => {
        sendArticle(dataDto, files);
    }

    useEffect(() => {
        searchCamp(name).then((res) => setDummy(res.data.campsite));
    }, [name])

    useEffect(() => {
        const newform = {
            "userUid": localStorage.getItem("userUid"),
            "category": "후기",
            "title": title,
            "content": content,
            "campingId": campingId,
            "environment": environment,
            "facility": facility,
            "service": service,
        }
        setDataDto(newform);
    }, [campingId, title, content, environment, facility, service])
        
    console.log(environment, facility, service);

    return (
        <div>
            <h1 className={styles.writereview_h1}>캠핑장 리뷰 작성</h1>
            
            {/* 캠핑장 이름 */}
            <div style={{marginBottom: "5%"}}>
                <h5 className={styles.writereview_campingname}>캠핑장 이름</h5>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <input
                            className={styles.writereview_input}
                            type="text"
                            value={name}
                            placeholder='캠핑장 이름을 입력하세요...'
                            onChange={(e) => setName(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    searchCamp(e.target.value)
                                        .then((res) => setCampingId(res.data.campsite[0].campingId))
                                        .catch((err) => {
                                            console.log("다시 검색해주세요");
                                        });
                                }
                            }}
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ width: "41%" }}>
                        {
                            dummy.map((element, index) => {
                                return (
                                    <Row key={index}>
                                        <Dropdown.Item onClick={() => {setName(element.facltNm), setCampingId(element.campingId)}}>{element.facltNm}</Dropdown.Item>
                                    </Row>
                                )
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* 캠핑장 평점 */}
            <div style={{marginBottom: "5%"}}>
                <h5 className={styles.writereview_campingname}>캠핑장 평가</h5>
                <Row>
                    <Col>
                        <Row>
                            <Col xs={3} style={{marginTop: "2.5%"}}>
                                <p className={styles.writereview_h6}>서비스</p>
                            </Col>
                            <Col xs={8} style={{marginTop: "2.5%"}}>
                                <a style={{marginRight: "3%", fontWeight: "bold"}}>{service}</a>
                                <Rating
                                    onClick={ratingChanged1}
                                    size={30}
                                />
                            </Col>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Col xs={3} style={{marginTop: "2.5%"}}>
                                <p className={styles.writereview_h6}>환경</p>
                            </Col>
                            <Col xs={8} style={{marginTop: "2.5%"}}>
                                <a style={{marginRight: "3%", fontWeight: "bold"}}>{environment}</a>
                                <Rating
                                    onClick={ratingChanged2}
                                    size={30}
                                />
                            </Col>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Col xs={3} style={{marginTop: "2.5%"}}>
                                <p className={styles.writereview_h6}>부대시설</p>
                            </Col>
                            <Col xs={8} style={{marginTop: "2.5%"}}>
                                <a style={{marginRight: "3%", fontWeight: "bold"}}>{facility}</a>
                                <Rating
                                    onClick={ratingChanged3}
                                    size={30}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            {/* 사진 업로드 */}
            <div style={{marginBottom: "5%"}}>
                <h5 className={styles.writereview_title}>사진 업로드</h5>
                <input type="file" id="profile-upload" accept="image/*" onChange={onChangeImg}/>
            </div>

            {/* 게시글 제목 */}
            <div style={{marginBottom: "2%"}}>
                <h5 className={styles.writereview_title}>제목</h5>
                <input
                    className={styles.writereview_input2}
                    type="text"
                    placeholder='제목을 입력하세요...'
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* 게시글 입력창 */}
            <div style={{marginBottom: "2%"}}>
                <textarea
                    className={styles.writereview_textarea}
                    type="text"
                    placeholder='내용을 입력하세요...'
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div>
                <Row className={styles.writereview_buttons}>
                    <Button variant="success" className={styles.writereview_button} onClick={modify}>작성</Button>
                    <Button variant="success" className={styles.writereview_button} onClick={submitSign}>뒤로가기</Button>
                </Row>
            </div>
        </div>
    );
}

export default Writereview;
 