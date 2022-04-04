import { Card, Row, Col } from "react-bootstrap";
import styles from "../../styles/CampingPlace/CampingUse.module.css";
import { useEffect, useState } from 'react';
import { similar } from "../../function/axios";
import CampingCard from "../../components/Common/CampingCard";
// import { useRouter } from 'next/router';


function CampingUse(props) {
    // const router = useRouter();

    const [campings, setCampings] = useState([])

    useEffect(() => {
        similar(props.props.campingId).then((res) => setCampings(res.data));
    },[])

    const moveCamping = (camping_id) => {
        // router.push(`/campingplace/${camping_id}`)
        // router로 할 시, 페이지가 바뀌지 않음
        location.href=`/campingplace/${camping_id}`
    }
    
    return (
        <>
            <div style={{height: "900px"}}>
                <Row>
                    {
                        campings.map((element, index) => {
                            return (
                                <Col sm key={index} style={{marginTop: "3%"}} onClick={() => moveCamping(element.camping_id)}>
                                    <CampingCard
                                        campingId={element.camping_id}
                                        firstImageUrl={element.first_image_url}
                                        title={element.faclt_nm}
                                        address={element.addr1}
                                        hashtag={element.thema_envrn_cl}
                                    />
                                </Col>
                            );
                        })
                    }
                </Row> 
            </div>
        </>
    );
}

export default CampingUse;
