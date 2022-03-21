import { useEffect, useState } from 'react';
import { Card } from "react-bootstrap";

function CampingCard(params) {

  const [hash, setHash] = useState([]);
  // useEffect(() => {
  //   console.log(params.hashtag)
  //   // setHash(params.hashtag.split(","));
  // })

  // console.log(hash);

  return (
    <>
      <Card style={{ width: "21rem", height: "23rem" }}>
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
            {/* {params.hashtag.map((element, index) => {
              return <span key={index}>#{element} </span>;
            })} */}
            {
              params.hashtag !==null ? <h6>#{params.hashtag.replaceAll(",", " #")}</h6> : null
            }
            {/* #{params.hashtag} */}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default CampingCard;
