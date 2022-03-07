import { Container, Navbar, Row, Col } from "reactstrap";

function Footer() {
  return (
    <Navbar color="success" fixed="bottom" light>
      <Container>
        <Row>
          <Col style={{ textAlign: "center", color: "white" }}>
            Copyrightⓒ2022 Campus All rights reserved.
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Footer;