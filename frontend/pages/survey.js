import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import styles from "/styles/Survey/Survey.module.css";

function survey() {

    return (
        <>
            <div className={styles.survey_div1}>
                    <h1 style={{fontWeight: "bold"}}>캠핑장 검색</h1>
            </div>
            
            <Container className={styles.survey_container}>
                <div className={styles.survey_div2}>
                    <Row>
                        <h4 style={{ fontWeight: "bold" }}>숙박 구분</h4>
                    </Row>
                    <Row>
                        <Button className={styles.survey_button}>오토캠핑</Button>
                        <Button className={styles.survey_button}>글렘핑</Button>
                        <Button className={styles.survey_button}>카라반</Button>
                        <Button className={styles.survey_button}>펜션</Button>
                        <Button className={styles.survey_button}>캠프닉(당일캠)</Button>
                    </Row>
                </div>
                <div className={styles.survey_div2}>
                    <Row>
                        <h4 style={{ fontWeight: "bold" }}>검색 구분</h4>
                    </Row>
                    <Row>
                        <Button className={styles.survey_button}>할인중</Button>
                        <Button className={styles.survey_button}>적립가능</Button>
                        <Button className={styles.survey_button}>이벤트중</Button>
                        <Button className={styles.survey_button}>신용카드</Button>
                        <Button className={styles.survey_button}>평일</Button>
                    </Row>
                </div>
                <div className={styles.survey_div2}>
                    <Row>
                        <h4 style={{ fontWeight: "bold" }}>정렬 조건</h4>
                    </Row>
                    <Row>
                        <Button className={styles.survey_button}>추천순</Button>
                        <Button className={styles.survey_button}>인기순</Button>
                        <Button className={styles.survey_button}>가격순</Button>
                        <Button className={styles.survey_button}>빈자리순</Button>
                        <Button className={styles.survey_button}>거리순</Button>
                    </Row>
                </div>
                <div className={styles.survey_div2}>
                    <Row>
                        <h4 style={{ fontWeight: "bold" }}>기본 시설</h4>
                    </Row>
                    <Row>
                        <Button className={styles.survey_button}>바다</Button>
                        <Button className={styles.survey_button}>산</Button>
                        <Button className={styles.survey_button}>강</Button>
                        <Button className={styles.survey_button}>계곡</Button>
                        <Button className={styles.survey_button}>호수</Button>
                        <Button className={styles.survey_button}>섬</Button>
                    </Row>
                </div>
                <div className={styles.survey_div3}>
                    <Row>
                        <h4 style={{ fontWeight: "bold" }}>편의 시설</h4>
                    </Row>
                    <Row>
                        <Button className={styles.survey_button}>공용화장실</Button>
                        <Button className={styles.survey_button}>개별화장실</Button>
                        <Button className={styles.survey_button}>공용샤워장</Button>
                        <Button className={styles.survey_button}>개별샤워장</Button>
                        <Button className={styles.survey_button}>계수대</Button>
                        <Button className={styles.survey_button}>매점</Button>
                        <Button className={styles.survey_button}>와이파이</Button>
                        <Button className={styles.survey_button}>카페</Button>
                    </Row>
                </div>
            </Container>
            
            <div className={styles.survey_div4}>
                <Button style={{background: "#007D0D"}}>검색</Button>
            </div>
        </>
    );
}

export default survey;