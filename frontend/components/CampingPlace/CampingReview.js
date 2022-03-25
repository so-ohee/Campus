import { Container, Col, Row } from "react-bootstrap";
import styles from "../../styles/CampingPlace/CampingReview.module.css";

const dummy = [
    {
        name: "박주한",
        review: "리뷰 1입니다",
        date: "2022.03.09",
    },
    {
        name: "박소희",
        review: "리뷰 2입니다",
        date: "2022.03.08",
    },
    {
        name: "최다운",
        review: "리뷰 3입니다",
        date: "2022.03.10",
    },
];

function CampingReview() {
    return (
        <>
            <Container>
                <div className={styles.campingreview_div}>
                    {dummy.map((element, index) => {
                        return (
                            <div className={styles.campingreview_row} key={index}>
                                <Row>
                                    <Col xs={1}>
                                        <img className={styles.campingreview_profile} src="../../profile.png" />
                                    </Col>
                                    <Col xs={9}>
                                        <img className={styles.campingreview_star} src="../../star.png" />
                                        <h5>{element.name}</h5>
                                    </Col>
                                    <Col xs={2} style={{textAlignLast: "right"}}>
                                        <h5>{element.date}</h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <h5 className={styles.campingreview_review}>{element.review}</h5>
                                </Row>
                            </div>
                        );
                    })}
                </div>
                
            </Container>

        </>
    );
}

export default CampingReview;
