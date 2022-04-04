import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Card } from "react-bootstrap";
import { receiveCamping_in, receiveCamping_out } from "../../function/axios";

function CampingCard(params) {

  const router = useRouter()
  const [userids, setUserids] = useState("");
  const [datas, setDatas] = useState("");

  useEffect(() => {
    receiveCamping_out(params.campingId).then((res) => setDatas(res.data.campsite));
    if (localStorage.getItem("userUid")!==null) {
      setUserids(localStorage.getItem("userUid"))
    }
  }, [params])
  
  const moveCamping = () => {
    localStorage.setItem("campid", params.campingId);
    router.push(`/campingplace/${params.campingId}`)
  }

  return (
      <>
          <Card style={{ width: "21rem", height: "23rem", borderRadius: "5%", cursor:'pointer'}} onClick={() => moveCamping()}>
              {
                datas.firstImageUrl == null ? 
                  <Card.Img variant="top" src="../../logo.png" style={{ width: "100%", height: "50%", borderRadius: "5% 5% 0% 0%" }} />
                  : <Card.Img variant="top" src={datas.firstImageUrl} style={{width: "100%", height: "50%", borderRadius: "5% 5% 0% 0%"}} />
              }        
              
              <Card.Body>
                  <Card.Title style={{ fontSize: "24px", fontWeight: "bold" }}>{datas.facltNm}</Card.Title>
                  <Card.Subtitle
                    className="mb-2 text-muted"
                    style={{ fontSize: "14px" }}
                  >
                      {datas.addr1} {datas.addr2}
                  </Card.Subtitle>
                  <Card.Text style={{ fontSize: "16px", color: "blue" }}>
                      {
                        datas.themaEnvrnCl !==null ? <a>#{`${datas.themaEnvrnCl}`.replaceAll(",", " #")}</a> : null
                      }
                  </Card.Text>
              </Card.Body>
          </Card>
      </>
  );
}

export default CampingCard;
