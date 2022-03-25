import { Container, Col, Row } from "react-bootstrap";
import CampingCard from "../Common/CampingCard";
import styles from "/styles/Recommend/Recommend.module.css";

const dummy = [
  {
    title: "달천공원오토캠핑장",
    address: "강원도 횡성군 갑천면 외갑천로 301",
    hashtag: ["일출명소", "일몰명소", "봄꽃여행", "여름물놀이", "걷기길"],
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
          <Col style={{ textAlign: "center" }}>
            <span>이 캠핑장 어떠신가요?</span>
          </Col>
        </Row>
        <Row className="pt-5">
          <Col sm className={styles.intro}>
            <div className={styles.intro_background}>
              <span className={styles.intro_text}>
                더위를 식혀주는 계곡이 있는 캠핑장
              </span>
            </div>
          </Col>
          {dummy.map((element, index) => {
            return (
              <Col sm key={index}>
                <CampingCard
                  title={element.title}
                  address={element.address}
                  hashtag={element.hashtag}
                />
              </Col>
            );
          })}
        </Row>
        <Row className="pt-5">
          <Col sm className={styles.intro}>
            <div className={styles.intro_background}>
              <span className={styles.intro_text}>
                추위를 식혀주는 꽝꽝언 캠핑장
              </span>
            </div>
          </Col>
          {dummy.map((element, index) => {
            return (
              <Col sm key={index}>
                <CampingCard
                  title={element.title}
                  address={element.address}
                  hashtag={element.hashtag}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Camp;
