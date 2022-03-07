import { Container, Col, Row } from "reactstrap";

function Camp() {
  return (
    <>
      <Container>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <span>이 캠핑장 어떠신가요?</span>
          </Col>
        </Row>
        <Row>
          <Col xs="3">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "200px",
                height: "200px",
                background: "#00d3d3",
                borderRadius: "50%",
                border: "6px solid #fff",
                boxShadow: "0 0 16px rgb(221, 221, 221)",
              }}
            >
              <span
                style={{
                  border: "1px solid blue",
                  textAlign: "center",
                }}
              >
                계곡이 있는 캠핑장
                <br /> 개고기 있는 캠핑장
              </span>
            </div>
          </Col>
          <Col xs="3"></Col>
          <Col xs="3"></Col>
        </Row>
      </Container>
    </>
  );
}

export default Camp;
