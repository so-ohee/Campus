import { useEffect, useState } from 'react';
import { Container, Col, Row } from "react-bootstrap";
import styles from "../../styles/CampingPlace/CampingReview.module.css";
import { viewBoard } from "../../function/axios";

function CampingReview(props) {

    // 댓글 조회
    const [dummy, setDummy] = useState([]);

    useEffect(() => {
        viewBoard(props.props.campingId).then((res) => setDummy(res.data.board));
    }, [])

    console.log(props);

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
