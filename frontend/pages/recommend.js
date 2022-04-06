import { Button, Card, Col, Container, Row } from "react-bootstrap";
import CampingCard from "../components/Common/CampingCard";
import styles from "../styles/Recommend/Recommend.module.css";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import  { recommend1, recommend2 }  from "../function/axios";


function Recommend() {
  const router = useRouter()

  const [campings1, setCampings1] = useState([])
  const [campings2, setCampings2] = useState([])
  const [page, setPage] = useState('')

  useEffect(() => {
    if (!localStorage.getItem("userUid")){
      router.push('/')
    }else{
    recommend1(localStorage.getItem("userUid"))
    .then((res) => {
      console.log(res)
      setCampings1(res.data.slice(0,6))
    })
    recommend2(localStorage.getItem("userUid"))
    .then((res) => {
      console.log(res)
      setCampings2(res.data.slice(0,6))
    })
    }
  }, []);

  function movesurvey() {
    router.push(`/survey`)
  }

  // 새로고침 또는 페이진 전환 시 초기 위치
  useEffect(() => {
    window.scrollTo(0, 500);
  }, [page]);


  return (
    <>
      <Container style={{marginTop: "2%", textAlign: "-webkit-right"}}>
        <Button variant="success" style={{width: "100px"}} onClick={() => movesurvey()}>재설문</Button>
      </Container>

      <Container style={{marginBottom: "4%"}}>
        <h1 style={{textAlignLast: "center", fontWeight: "bold", paddingTop: "3%", marginBottom: "1%"}}>나와 비슷한 유저가 간 캠핑장</h1>
        <Row style={{ textAlign: "-webkit-center" }}>
          {
            campings1.map((datas, index) => {
              return (
                <Col sm key={index} style={{ marginTop: "3%" }}>
                  <CampingCard
                    campingId={datas.camping_id}
                    title={datas.faclt_nm}
                    address={datas.addr1}
                    hashtag={datas.thema_envrn_cl}
                  />
                </Col>
              )
            })
          }
        </Row>
      </Container>

      <hr />

      <Container style={{marginTop: "1%", marginBottom: "4%"}}>
        <h1 style={{textAlignLast: "center", fontWeight: "bold", paddingTop: "3%", marginBottom: "1%"}}>내가 간 캠핑장과 비슷한 캠핑장</h1>
        <Row style={{ textAlign: "-webkit-center" }}>
          {
            campings2.map((datas, index) => {
              return (
                <Col sm key={index} style={{ marginTop: "3%" }}>
                  <CampingCard
                    campingId={datas.camping_id}
                    title={datas.faclt_nm}
                    address={datas.addr1}
                    hashtag={datas.thema_envrn_cl}
                  />
                </Col>
              )
            })
          }
        </Row>
      </Container>
    
      {campings2.length == 0 && <h2 style={{textAlignLast: "center"}}>내가 간 캠핑장이 없습니다.</h2>}

    </>
  );
}

export default Recommend;
