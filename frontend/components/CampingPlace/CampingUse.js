import { Card, Row } from "react-bootstrap";
import styles from "../../styles/CampingPlace/CampingUse.module.css";
import { useEffect, useState } from 'react';
import { similar } from "../../function/axios";


function CampingUse(props) {

    const [campings, setCampings] = useState([])

    useEffect(() => {
        similar(props.props.campingId).then((res) => setCampings(res.data));
    },[])


    return (
        <>
            <div>
                <Row>
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
                </Row>
            </div>
        </>
    );
}

export default CampingUse;
