import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import  ShoppingCard  from "../components/Common/ShoppingCard";
import  {Shoppingcamp}  from "../function/axios";
import styles from "../styles/Shopping/Shopping.module.css";

function Shopping() {

    const [dummy, setDummy] = useState([]);

    useEffect(() => {
        Shoppingcamp().then((res) => setDummy(res.data.items));
    }, []);

    console.log(dummy);

    return (
        <Container style={{height: "1750px", marginTop: "2%", marginBottom: "2%"}}>
            <h1 className={styles.shopping_h1}>캠핑 용품 쇼핑</h1>
                <Row>
                    {dummy.map((element, index) => {
                        return (
                        <Col sm key={index} style={{textAlign: "-webkit-center"}}>
                            <ShoppingCard
                                image={element.image}
                                link={element.link}
                                price={element.price}
                                title={element.title}
                            />
                        </Col>
                        );
                    })}
                </Row>
        </Container>
    );
}

export default Shopping;