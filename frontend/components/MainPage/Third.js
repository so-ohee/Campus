import { Row, Col, Container } from 'react-bootstrap';
import styles from "/styles/MainPage/MainPageThird.module.css";
import CampingCard from "/components/common/CampingCard";
import { viewCamping } from "../../function/axios";
import { useEffect, useState } from 'react';

function Third() {

    const [campingplace, setCampingplace] = useState([]);
    useEffect(() => {
        viewCamping()
        .then(function (response) {
            setCampingplace(response.data.blogList);
    });
    }, []);

    // console.log(campingplace);

    return (
        // 일단 저장해두기
        // <div className={styles.third_main}>
        //     <Container>
        //         <h1 className={styles.third_h1}>인기 캠핑장 TOP 3</h1>
        //         <Row>
        //             {dummy.map((element, index) => {
        //                 return (
        //                     <Col sm key={index}>
        //                         <ReviewCard
        //                             title={element.title}
        //                             name={element.name}
        //                             star={element.star}
        //                             review={element.review}
        //                         />
        //                     </Col>
        //                 );
        //             })}
        //         </Row>
        //     </Container>
        // </div>
        
        <div className={styles.third_main}>
            <Container>
                <h1 className={styles.third_h1}>인기 캠핑장 TOP 3</h1>
                <Row>
                {campingplace.map((element, index) => {
                        return (
                        <Col sm key={index}>
                            <CampingCard
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

export default Third;