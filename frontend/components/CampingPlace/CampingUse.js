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
            <div>
                {/* <Row>
                    {campings.map((datas, index) => (
                    <Card style={{ width: "21rem", height: "23rem", borderRadius: "5%", padding:'0px' }} key={index} onClick={() => moveCamping(datas.camping_id)}>
                        {
                        datas.first_image_url == null ? 
                            <Card.Img variant="top" src="../../logo.png" style={{ width: "100%", height: "50%", borderRadius: "5% 5% 0% 0%" }} />
                            : <Card.Img variant="top" src={datas.first_image_url} style={{width: "100%", height: "50%", borderRadius: "5% 5% 0% 0%"}} />
                        }        
                        
                        <Card.Body>
                            <Card.Title style={{ fontSize: "24px" }}>{datas.faclt_nm}</Card.Title>
                            <Card.Subtitle
                            className="mb-2 text-muted"
                            style={{ fontSize: "14px" }}
                            >
                                {datas.addr1}
                            </Card.Subtitle>
                            <Card.Text style={{ fontSize: "16px" }}>
                                {
                                datas.thema_envrn_cl !== null ? <a>#{`${datas.thema_envrn_cl}`.replaceAll(",", " #")}</a> : null
                                }
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    ))}
                </Row> */}

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
