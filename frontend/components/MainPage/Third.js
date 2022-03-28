import { Row, Col, Container } from 'react-bootstrap';
import styles from "../../styles/MainPage/MainPageThird.module.css";
import CampingCard from "../Common/CampingCard";
// import { viewCamping } from "../../function/axios";
import { useEffect, useState } from 'react';

function Third() {

    // const [campingplace, setCampingplace] = useState([]);
    // useEffect(() => {
    //     viewCamping()
    //     .then(function (response) {
    //         setCampingplace(response.data.blogList);
    // });
    // }, []);

    return (        
        <div className={styles.third_main}>
            <Container>
                <h1 className={styles.third_h1}>인기 캠핑장 TOP 3</h1>
                <Row>
                {/* {campingplace.map((element, index) => {
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
                    })} */}
                </Row>
            </Container>
        </div>
    );
}

export default Third;