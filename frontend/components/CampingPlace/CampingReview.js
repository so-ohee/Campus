import { useEffect, useState } from 'react';
import { Container, Col, Row } from "react-bootstrap";
import styles from "../../styles/CampingPlace/CampingReview.module.css";
import { viewBoard } from "../../function/axios";

// const dummy = [
//     {
//         name: "박주한",
//         review: "리뷰 1입니다",
//         date: "2022.03.09",
//     },
//     {
//         name: "박소희",
//         review: "리뷰 2입니다",
//         date: "2022.03.08",
//     },
//     {
//         name: "최다운",
//         review: "리뷰 3입니다",
//         date: "2022.03.10",
//     },
// ];

function CampingReview(props) {

    // 댓글 조회
    const [dummy, setDummy] = useState([]);
    useEffect(() => {
        viewBoard(props.campingId.campingId).then((res) => setDummy(res.data.board));
    }, [])

    console.log(dummy);

    return (
        <>
            <Container>
                <div className={styles.campingreview_div}>
                    {
                        dummy === null ? 
                            (
                                dummy.map((element, index) => {
                                    return (
                                        <div className={styles.campingreview_row} key={index}>
                                            <Row>
                                                <Col xs={1}>
                                                    <img className={styles.campingreview_profile} src={element.profile} />
                                                </Col>
                                                <Col xs={8}>
                                                    <img className={styles.campingreview_star} src="../../star.png" />
                                                    <h5>{element.name}</h5>
                                                </Col>
                                                <Col xs={3} style={{textAlignLast: "right"}}>
                                                    <h5>{element.createTime}</h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <h5 className={styles.campingreview_review}>{element.title}</h5>
                                            </Row>
                                        </div>
                                    );
                                })
                            ) : 
                            (
                                <div className={styles.campingreview_comment}>
                                    <h1 style={{textAlign: "center"}}>댓글이 없습니다</h1>
                                </div>
                            )
                    }
                </div>
                
            </Container>

        </>
    );
}

export default CampingReview;
