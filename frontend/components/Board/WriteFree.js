import React, { useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import styles from "../../styles/Board/WriteReview.module.css";
import { sendArticle2 } from "../../function/axios";

function Writefree(props) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userUid, setuserUid] = useState("");
    const [postfiles, setPostfiles] = useState({
        file: [],
        previewURL: "",
    });

    const submitSign = () => {
        props.propFunction("기본")
    }
    
    const modify = () => {
        sendArticle2(localStorage.getItem("userUid"), "자유", title, content, postfiles)
    }

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
            <h1 className={styles.writereview_h1}>자유게시글 작성</h1>

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
                    <Button variant="success" className={styles.writereview_button} onClick={modify}>수정</Button>
                    <Button variant="success" className={styles.writereview_button} onClick={submitSign}>뒤로가기</Button>
                </Row>
            </div>
        </div>
    );
}

export default Writefree;