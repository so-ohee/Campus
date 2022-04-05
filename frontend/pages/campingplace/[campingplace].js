import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { Container, Nav } from 'react-bootstrap';
import CampingExplain from '../../components/CampingPlace/CampingExplain.js';
import CampingExplain_Login from '../../components/CampingPlace/CampingExplain_Login.js';
import CampingIntro from '../../components/CampingPlace/CampingIntro.js';
import CampingMap from '../../components/CampingPlace/CampingMap.js';
import CampingReview from '../../components/CampingPlace/CampingReview.js';
import CampingUse from '../../components/CampingPlace/CampingUse.js';
import styles from "../../styles/CampingPlace/CampingPlace.module.css";
import { receiveCamping_in, receiveCamping_out } from "../../function/axios";

function Campingplace() {

  const [selected, setSelected] = useState("1");
  const [datas, setDatas] = useState("");
  const [datas2, setDatas2] = useState("");
  const [userids, setUserids] = useState(undefined);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      localStorage.setItem("campid", router.query.campingplace);
      localStorage.getItem("userUid") == undefined ?
        receiveCamping_out(localStorage.getItem("campid")).then((res) => setDatas(res.data.campsite))
        : receiveCamping_in(localStorage.getItem("campid"), localStorage.getItem("userUid")).then((res) => { setDatas(res.data.campsite), setDatas2(res.data) })
    }
  }, [router.isReady])

  useEffect(() => {
    setUserids(localStorage.getItem("userUid"));
  }, [])

  // 새로고침 또는 페이진 전환 시 초기 위치
  useEffect(() => {
    window.scrollTo(0, 500);
  }, []);

  return (
    
    <div>
      {
          userids == undefined ? <CampingExplain props={datas} /> : <CampingExplain_Login props={datas2} />
      }
      
        <Container>
          {/* 선택바(캠핑장소개, 위치&주변정보, 리뷰, 이용안내) */}
          <div className={styles.campingexplain_selectbar}>
            <Nav className={styles.nav_pills} variant="pills" defaultActiveKey="link-1">
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
                <Nav.Link className={styles.nav_link} onClick={() => setSelected("4")} eventKey="link-4">비슷한 캠핑장</Nav.Link>
              </Nav.Item>
            </Nav>
          </div> 
        <div>
          {
            selected === "1" && <CampingIntro props={datas} />
          }
          {
            selected === "2" && <CampingMap props={datas} />
          }
          {
            selected === "3" && <CampingReview props={datas} />
          }
          {
            selected === "4" && <CampingUse props={datas} />
          }
        </div>
      </Container>
    </div>
  );
}

export default Campingplace;
