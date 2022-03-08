import { Row, Col, Container } from 'react-bootstrap';
import styles from "/styles/MainPageThird.module.css";
import ReviewCard from "/components/common/ReviewCard";

const dummy = [
    {
        title: "달천공원오토캠핑장",
        star: 5,
        review: "좋은 캠핑장. 로맨틱. 성공적",
    },
    {
        title: "청풍호오토캠핑장",
        star: 5,
        review: "좋은 캠핑장. 로맨틱. 성공적",
    },
    {
        title: "마음이 머무는 곳",
        star: 4,
        review: "좋은 캠핑장. 로맨틱. 성공적",
    },
];

function Third() {
    return (
        <div className={styles.third_main}>
            <Container>
                <h1 className={styles.third_h1}>리뷰로 보는 캠핑장 TOP 3</h1>
                <Row>
                    {dummy.map((element, index) => {
                        return (
                        <Col sm key={index}>
                            <ReviewCard
                            title={element.title}
                            star={element.star}
                            review={element.review}
                            />
                        </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}
export default Third;