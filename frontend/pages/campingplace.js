import React, { useState } from 'react';
import { Col, Container, Nav } from 'react-bootstrap';
import CampingExplain from '/components/CampingPlace/CampingExplain.js';
import CampingIntro from '/components/CampingPlace/CampingIntro.js';
import CampingMap from '/components/CampingPlace/CampingMap.js';
import CampingReview from '/components/CampingPlace/CampingReview.js';
import CampingUse from '/components/CampingPlace/CampingUse.js';
import styles from "/styles/CampingPlace/CampingPlace.module.css";

function campingplace() {

  const [selected, setSelected] = useState("1");

  return (
    
    <div>
      <CampingExplain />
        <Container>
          {/* 선택바(캠핑장소개, 위치&주변정보, 리뷰, 이용안내) */}
          <div className={styles.campingexplain_selectbar}>
            <Nav className={styles.nav_pills} variant="pills" >
              <Nav.Item className={styles.nav_item}>
                <Nav.Link className={styles.nav_link} onClick={() => setSelected("1")} eventKey="link-1">캠핑장 소개</Nav.Link>
              </Nav.Item>
              <Nav.Item className={styles.nav_item}>
                <Nav.Link className={styles.nav_link} onClick={() => setSelected("2")} eventKey="link-2">캠핑장 위치 & 주변 정보</Nav.Link>
              </Nav.Item>
              <Nav.Item className={styles.nav_item}>
                <Nav.Link className={styles.nav_link} onClick={() => setSelected("3")} eventKey="link-3">캠핑장 리뷰</Nav.Link>
              </Nav.Item>
              <Nav.Item className={styles.nav_item}>
                <Nav.Link className={styles.nav_link} onClick={() => setSelected("4")} eventKey="link-4">캠핑장 이용안내</Nav.Link>
              </Nav.Item>
            </Nav>
          </div> 
        <div>
          {
            selected === "1" && <CampingIntro />
          }
          {
            selected === "2" && <CampingMap />
          }
          {
            selected === "3" && <CampingReview />
          }
          {
            selected === "4" && <CampingUse />
          }
        </div>
      </Container>
    </div>
  );
}

export default campingplace;
