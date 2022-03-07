import { Card } from "react-bootstrap";

function CampingCard(params) {
  return (
    <>
      <Card style={{ width: "20rem" }}>
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
            {params.hashtag.map((element, index) => {
              return <span key={index}>#{element} </span>;
            })}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default CampingCard;
