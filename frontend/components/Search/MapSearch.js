import React from 'react';
import CampingCard from "../Common/CampingCard";
import { Col, Container, Pagination, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { VisitList, visit } from "../../function/axios";
import styles from "../../styles/MyPage/VisitedCamp.module.css";
import { Map, MapMarker } from "react-kakao-maps-sdk"
import { useRouter } from 'next/router';

function Mapsearch() {

    const router = useRouter();
    const [campingplace, setCampingplace] = useState([]);

    // 지도
    const [isOpen, setIsOpen] = useState(false)
    const [campings, setCampings] = useState([])
    const [map, setMap] = useState();
    const [info, setInfo] = useState();
    let lst = []


    
    useEffect(() => {
        visit(localStorage.getItem("userUid"))
            .then((res) => {
                setCampings(res.data)
                for (let i = 0; i < res.data.length; i++) {
                    lst.push(false)
                }
                setIsOpen(lst)
            })
    }, []);

    return (
        <>
            
            {/* <div style={{textAlign: "-webkit-center", marginTop: "3%", marginBottom: "3%"}}>
                <Map // 지도를 표시할 Container
                    center={{
                        // 지도의 중심좌표
                        lat: 36.3,
                        lng: 127.8,
                    }}
                    style={{
                        // 지도의 크기
                        width: "92%",
                        height: "500px",
                        borderRadius: "2%"
                    }}
                    level={13} // 지도의 확대 레벨
                >
                {
                    campings.map((data, idx) => (
                    <MapMarker 
                        key={idx}
                        position={{
                            lat: data.map_y,
                            lng: data.map_x,
                        }}
                        clickable={true}
                        onClick={() => router.push(`/campingplace/${data.camping_id}`)}
                        onMouseOver={
                            () => setIsOpen({
                                ...isOpen,
                                [idx] : true
                            })
                        }
                        onMouseOut={
                            () => setIsOpen({
                                ...isOpen,
                                [idx] : false
                            })
                        }
                    >
                        {isOpen[idx] && <div className="fw-bold" style={{ padding: "5px", color: "#000" }}>{data.faclt_nm}</div>}
                    </MapMarker>
                ))}
                </Map>
            </div> */}

        <div style={{textAlign: "-webkit-center", marginTop: "3%", marginBottom: "3%"}}>
        <Map // 지도를 표시할 Container
          center={{ lat: 33.452613, lng: 126.570888 }}
          style={{
            // 지도의 크기
            width: "92%",
            height: "600px",
            borderRadius: "2%"
          }}
          level={3} // 지도의 확대 레벨
          onCreate={(map) => setMap(map)}
        >

            </Map>
            </div>
            {map && (
            <button onClick={() => {
              setInfo({
                center: {
                  lat: map.getCenter().getLat(),
                  lng: map.getCenter().getLng(),
                },
                level: map.getLevel(),
                typeId: map.getMapTypeId(),
                swLatLng: {
                  lat: map.getBounds().getSouthWest().getLat(),
                  lng: map.getBounds().getSouthWest().getLng(),
                },
                neLatLng: {
                  lat: map.getBounds().getNorthEast().getLat(),
                  lng: map.getBounds().getNorthEast().getLng(),
                },
              })
              console.log(map.getBounds().getNorthEast().getLat())
            }}>
              여기서 검색
            </button>
            )}

        </>
    );
}

export default Mapsearch;