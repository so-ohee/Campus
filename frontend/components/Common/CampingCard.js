import { useState } from 'react';
import { Card } from "react-bootstrap";

function CampingCard(params) {

  console.log(params);
  return (
      <>
          <Card style={{ width: "21rem", height: "23rem" }} onClick={() => console.log("카드 눌렀어")}>
              <Card.Img variant="top" src="/logo.png" />
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
                        params.hashtag !==null ? <h6>#{params.hashtag.replaceAll(",", " #")}</h6> : null
                      }
                  </Card.Text>
              </Card.Body>
          </Card>
      </>
  );
}

export default CampingCard;
