import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Card } from "react-bootstrap";
import { receiveCamping_in, receiveCamping_out } from "../../function/axios";

function CampingCard(params) {

  const router = useRouter()
  const [ids, setIds] = useState("");
  const [datas, setDatas] = useState("");

  useEffect(() => {
    setIds(params.campingId);
  })

  useEffect(() => {
      receiveCamping_out(ids).then((res) => setDatas(res.data.campsite));
  }, [])
  
  const moveCamping = (id) => {
    router.push(`/campingplace/${ids}`)
  }

  console.log(params);

  return (
      <>
          <Card style={{ width: "21rem", height: "23rem" }} onClick={() => moveCamping()}>
              <Card.Img variant="top" src={datas.firstImageUrl} />
              <Card.Body>
                  <Card.Title style={{ fontSize: "24px" }}>{datas.facltNm}</Card.Title>
                  <Card.Subtitle
                    className="mb-2 text-muted"
                    style={{ fontSize: "14px" }}
                  >
                      {datas.addr1} {datas.addr2}
                  </Card.Subtitle>
                  <Card.Text style={{ fontSize: "16px" }}>
                      {
                        datas.themaEnvrnCl !==null ? <a>#{datas.themaEnvrnCl}</a> : null
                      }
                  </Card.Text>
              </Card.Body>
          </Card>
      </>
  );
}

export default CampingCard;
