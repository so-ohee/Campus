import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import styles from "/styles/Board/WriteReview.module.css";
import ReactStars from "react-rating-stars-component";

function writereview(props) {

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    const submitSign = () => {
        props.propFunction("기본")
    }

    const [postfiles, setPostfiles] = useState({
        file: [],
        previewURL: "",
    });

    const uploadFile = (e) => {
        e.stopPropagation();
        let reader = new FileReader();
        let file = e.target.files[0];
        const filesInArr = Array.from(e.target.files);
    
        reader.onloadend = () => {
            setPostfiles({
                file: filesInArr,
                previewURL: reader.result,
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <div>
            <h1 className={styles.writereview_h1}>캠핑장 리뷰 작성</h1>

            {/* 캠핑장 이름 */}
            <div style={{marginBottom: "5%"}}>
                <h5 className={styles.writereview_campingname}>캠핑장 이름</h5>
                <input className={styles.writereview_input} />
            </div>

            {/* 캠핑장 평점 */}
            <div style={{marginBottom: "5%"}}>
                <h5 className={styles.writereview_campingname}>캠핑장 이름</h5>
                <Row>
                    <Col>
                        <Row>
                            <Col xs={3} style={{marginTop: "2.5%"}}>
                                <h6 className={styles.writereview_h6}>서비스</h6>
                            </Col>
                            <Col xs={8}>
                                <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                activeColor="#ffd700"
                            />
                            </Col>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Col xs={3} style={{marginTop: "2.5%"}}>
                                <h6 className={styles.writereview_h6}>환경</h6>
                            </Col>
                            <Col xs={8}>
                                <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                activeColor="#ffd700"
                            />
                            </Col>
                        </Row>
                    </Col>

                    <Col>
                        <Row>
                            <Col xs={3} style={{marginTop: "2.5%"}}>
                                <h6 className={styles.writereview_h6}>부대시설</h6>
                            </Col>
                            <Col xs={8}>
                                <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                activeColor="#ffd700"
                            />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            {/* 게시글 제목 */}
            <div style={{marginBottom: "5%"}}>
                <h5 className={styles.writereview_title}>사진 업로드</h5>
                {/* <Form.Group controlId="formFileSm" className="mb-3">
                    <Form.Control nultiple="multiple" type="file" size="sm" />
                </Form.Group> */}
                <input
                id="upload-file"
                type="file"
                multiple
                onChange={uploadFile}
                ></input>
            </div>

            {/* 게시글 제목 */}
            <div style={{marginBottom: "2%"}}>
                <h5 className={styles.writereview_title}>제목</h5>
                <input className={styles.writereview_input2} />
            </div>

            {/* 게시글 입력창 */}
            <div style={{marginBottom: "2%"}}>
                <textarea className={styles.writereview_textarea} />
            </div>

            <div>
                <Row className={styles.writereview_buttons}>
                    <Button variant="success" className={styles.writereview_button}>등록</Button>
                    <Button variant="success" className={styles.writereview_button} onClick={submitSign}>뒤로가기</Button>
                </Row>
            </div>
        </div>
    );
}

export default writereview;
