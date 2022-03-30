import React, { useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import styles from "../../styles/Board/WriteReview.module.css";
import { sendArticle2 } from "../../function/axios";

function Writefree(props) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");
    const [dataDto, setDataDto] = useState({})

    const submitSign = () => {
        props.propFunction("기본")
    }
    
    const onChangeImg = async (e) => {
        e.preventDefault();
        if (e.target.files) {
            const uploadFile = e.target.files;
            setFiles(uploadFile);
        }
    }
    
    const modify = () => {
        sendArticle2(dataDto, files);
    }

    useEffect(() => {
        const newform = {
            "userUid": localStorage.getItem("userUid"),
            "category": "자유",
            "title": title,
            "content": content,
            "campingId": null,
            "environment": null,
            "facility": null,
            "service": null,
        }
        setDataDto(newform);
    }, [title, content])

    return (
        <div>
            <h1 className={styles.writereview_h1}>자유게시글 작성</h1>

            {/* 게시글 제목 */}
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

export default Writefree;