import { Row, Col, Container } from 'react-bootstrap';
import styles from "/styles/MainPage/MainPageFirst.module.css";
import CampingCard from "/components/common/CampingCard";
import { viewCamping } from "../../function/axios";
import { useEffect, useState } from 'react';

function First() {

    const [title, setTitle] = useState("");
    const [campingplace, setCampingplace] = useState([]);

    useEffect(() => {
        viewCamping()
            .then(function (response) {
                setTitle(response.data.season);
                setCampingplace(response.data.seasonList);
    });
    }, []);
    
    return (
        <div className={styles.first_main}>
            <Container>
                <h1 className={styles.first_h1}>{title}</h1>
                <Row>
                    {campingplace.map((element, index) => {
                        return (
                        <Col sm key={index}>
                            <CampingCard
                                campingId={element.campingId}
                                title={element.facltNm}
                                address={element.addr1}
                                hashtag={element.themaEnvrnCl}
                            />
                        </Col>
                        );
                    })}
                </Row>
                
            </Container>
        </div>
    );
}
export default First;