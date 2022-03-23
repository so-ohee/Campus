import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row, Tab, Tabs } from 'react-bootstrap';
import styles from "/styles/MyPage/MyPage.module.css";
import VisitedCamp from '/components/MyPage/VisitedCamp.js';
import ReviewCamp from '/components/MyPage/ReviewCamp.js';
import Bookmarkcamp from '/components/MyPage/Bookmarkcamp.js';
import { bringUser, changePic, changeProfileName } from "../function/axios";

function mypage() {
    const [data, setData] = useState("");
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        bringUser(localStorage.getItem("userUid")).then((res) => setData(res.data.user));
    }, [])

    return (
        <div>
            <Container style={{ height: "1300px" }}>
                <div className={styles.mypage_div1}>
                    <Row>
                        <Col xs={2}>
                            <img className={styles.mypage_profile_pic} src={ `${data.profile}` } />
                        </Col>
                        <Col xs={7} style={{alignSelf: "center"}}>
                            <h2 style={{ fontWeight: "bold" }}>{ data.name }</h2>
                        </Col>
                        <Col xs={3} style={{textAlignLast: "right"}}>
                            <Button variant='outline-success' style={{ marginRight: "1%" }} onClick={() => setModalShow(true)}>회원정보 수정</Button>
                            <ModifyModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                            <Button variant='outline-danger'>회원탈퇴</Button>
                        </Col>
                    </Row>
                </div>

                <div className={styles.mypage_div2}>
                    <Tabs style={{width: "1320px"}} defaultActiveKey="Visited" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="Visited" title="Visited">
                            <VisitedCamp />
                        </Tab>
                        <Tab eventKey="Review" title="Review">
                            <ReviewCamp />
                        </Tab>
                        <Tab eventKey="Bookmark" title="Bookmark">
                            <Bookmarkcamp />
                        </Tab>
                    </Tabs>
                </div>
            </Container>
        </div>
    );
}

function ModifyModal(props) {

    const [userid, setUserid] = useState("");
    const [datas, setDatas] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        bringUser(localStorage.getItem("userUid")).then((res) => setUserid(res.data.user.userUid));
    }, [])

    const onChangeImg = (e) => {
        e.preventDefault();
        
        if (e.target.files) {
            const uploadFile = e.target.files[0];
            // console.log(uploadFile);
            const formData = new FormData()
            formData.append('files', uploadFile)
            setDatas(formData);
        }
    };

    const changeImg = () => {
        console.log(datas);
        changePic(userid, datas);
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const changeName = () => {
        changeProfileName(name, userid).then(() => location.reload());
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>회원정보 수정하기</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: "-webkit-center"}}>
                <div style={{width: "600px", height: "80px"}}>
                    <Row style={{height: "50px"}}>
                        <Col xs={4}>
                            <h5 style={{fontWeight: "bold"}}>프로필 사진 변경</h5>
                        </Col>
                        <Col xs={6}>
                            <form>
                                <label htmlFor="profile-upload" />
                                <input type="file" id="profile-upload" accept="image/*" onChange={onChangeImg}/>
                            </form>
                        </Col>
                        <Col xs={2}>
                            <Button variant='outline-success' onClick={() => changeImg()}>변경</Button>
                        </Col>
                    </Row>
                    <Row style={{height: "50px"}}>
                        <Col xs={4}>
                            <h5 style={{fontWeight: "bold"}}>아이디 변경</h5>
                        </Col>
                        <Col xs={6}>
                            <Form.Control size="sm" type="text" onChange={onChangeName} placeholder="변경할 아이디를 입력하세요." />
                        </Col>
                        <Col xs={2}>
                            <Button variant='outline-success' onClick={() => changeName()}>변경</Button>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        );
  }

export default mypage;