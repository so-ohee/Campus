import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Card } from "react-bootstrap";

function CampingCard(params) {

  const router = useRouter()
  const [ids, setIds] = useState("");

  useEffect(() => {
    setIds(params.campingId);
  })
  
  const moveCamping = (id) => {
    router.push(`/campingplace/${ids}`)
  }

  return (
      <>
          <Card style={{ width: "21rem", height: "23rem" }} onClick={() => moveCamping()}>
              <Card.Img variant="top" src="../../logo.png" />
              <Card.Body>
                  <Card.Title style={{ fontSize: "24px" }}>{params.title}</Card.Title>
                  <Card.Subtitle
                    className="mb-2 text-muted"
                    style={{ fontSize: "14px" }}
                  >
                      {params.address}
                  </Card.Subtitle>
                  <Card.Text style={{ fontSize: "16px" }}>
                      {
                        params.hashtag !==null ? <a>#{params.hashtag}</a> : null
                      }
                  </Card.Text>
              </Card.Body>
          </Card>
      </>
  );
}

export default CampingCard;
