import { Container, Col, Row } from "react-bootstrap";
import { BsSuitHeart } from "react-icons/bs";
import styles from "/styles/CampingPlace/CampingExplain.module.css";

const dummy = [
    {
        title: "달천공원오토캠핑장",
        address: "강원도 횡성군 갑천면 외갑천로 301",
        hashtag: ["일출명소", "일몰명소", "봄꽃여행", "여름물놀이", "걷기길"],
        phone: "010-1234-1234"
    },
    {
        title: "청풍호오토캠핑장",
        address: "충청북도 제천시 청풍면 용곡길 211번길 2",
        hashtag: ["짚라인", "체험형", "캠핑요리"],
    },
    {
        title: "마음이 머무는 곳",
        address: "강원도 화천군 사내면 포화로 653-76",
        hashtag: ["아로마향초만들기", "천연염색", "캠핑요리"],
    },
];

function Camp() {
    return (
        <>
            <Container>
                <Row>
                    <div className={styles.capmingplace_main_pic_div}>
                        <img className={styles.capmingplace_main_pic} src="/logo.png" />
                    </div>
                    <div className={styles.capmingplace_explain}>
                        <Col>
                            <h2 style={{fontWeight: "bold"}}>{dummy[0].title}</h2>
                            <h6>{dummy[0].address}</h6>
                            <h6>{dummy[0].phone}</h6>
                            <h6 style={{color: "lightgrey"}}>
                                {dummy[0].hashtag.map((element, index) => {
                                    return <span key={index}>#{element} </span>;
                                })}
                            </h6>
                        </Col>
                        <Col>
                            <BsSuitHeart />
                        </Col>
                    </div>
                    
                </Row>
            </Container>
        </>
    );
}

export default Camp;
