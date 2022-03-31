import { Card, Row } from "react-bootstrap";
import CampingCard from "../components/Common/CampingCard";
import styles from "../styles/Recommend/Recommend.module.css";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import  { recommend1, recommend2 }  from "../function/axios";


function Recommend() {
  const router = useRouter()

  const [campings1, setCampings1] = useState([])
  const [campings2, setCampings2] = useState([])

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

  const moveCamping = (camping_id) => {
    router.push(`/campingplace/${camping_id}`)
  }

  return (
    <>
    <h1>나와 비슷한 유저가 간 캠핑장</h1>
    <Row>
      {campings1.map((datas, index) => (
          <Card style={{ width: "21rem", height: "23rem", borderRadius: "5%", padding:'0px' }} key={index} onClick={() => moveCamping(datas.camping_id)}>
          {
            datas.first_image_url == null ? 
              <Card.Img variant="top" src="../../logo.png" style={{ width: "100%", height: "50%", borderRadius: "5% 5% 0% 0%" }} />
              : <Card.Img variant="top" src={datas.first_image_url} style={{width: "100%", height: "50%", borderRadius: "5% 5% 0% 0%"}} />
          }        
          
          <Card.Body>
              <Card.Title style={{ fontSize: "24px" }}>{datas.faclt_nm}</Card.Title>
              <Card.Subtitle
                className="mb-2 text-muted"
                style={{ fontSize: "14px" }}
              >
                  {datas.addr1}
              </Card.Subtitle>
              <Card.Text style={{ fontSize: "16px" }}>
                  {
                    datas.thema_envrn_cl !== null ? <a>#{`${datas.thema_envrn_cl}`.replaceAll(",", " #")}</a> : null
                  }
              </Card.Text>
          </Card.Body>
        </Card>
      ))}
      </Row>

    <br></br><br></br>
    <h1>내가 간 캠핑장과 비슷한 캠핑장</h1>
    <Row>
      {campings2.map((datas, index) => (
          <Card style={{ width: "21rem", height: "23rem", borderRadius: "5%", padding:'0px' }} key={index} onClick={() => moveCamping(datas.camping_id)}>
          {
            datas.first_image_url == null ? 
              <Card.Img variant="top" src="../../logo.png" style={{ width: "100%", height: "50%", borderRadius: "5% 5% 0% 0%" }} />
              : <Card.Img variant="top" src={datas.first_image_url} style={{width: "100%", height: "50%", borderRadius: "5% 5% 0% 0%"}} />
          }        
          
          <Card.Body>
              <Card.Title style={{ fontSize: "24px" }}>{datas.faclt_nm}</Card.Title>
              <Card.Subtitle
                className="mb-2 text-muted"
                style={{ fontSize: "14px" }}
              >
                  {datas.addr1}
              </Card.Subtitle>
              <Card.Text style={{ fontSize: "16px" }}>
                  {
                    datas.thema_envrn_cl !== null ? <a>#{`${datas.thema_envrn_cl}`.replaceAll(",", " #")}</a> : null
                  }
              </Card.Text>
          </Card.Body>
        </Card>
      ))}
      </Row>
      {campings2.length == 0 && <h2>-내가 간 캠핑장이 없습니다-</h2>}

    </>
  );
}

export default Recommend;
