import React from 'react';
import CampingCard from "../Common/CampingCard";
import { Col, Container, Pagination, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { VisitList, visit, mapsearch } from "../../function/axios";
import styles from "../../styles/MyPage/VisitedCamp.module.css";
import { Map, MapMarker } from "react-kakao-maps-sdk"
import { useRouter } from 'next/router';

function Mapsearch() {

    const router = useRouter();
    const [campingplace, setCampingplace] = useState([]);

    // 지도
    const [isOpen, setIsOpen] = useState([])
    const [falseList, setFalseList] = useState()
    const [campings, setCampings] = useState([])
    const [map, setMap] = useState();
    const [info, setInfo] = useState();
    const [lat, setLat] = useState(35.2040949)
    const [long, setLong] = useState(126.8071876)

    
    useEffect(() => {
        if (map){
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
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                setLat(position.coords.latitude)
                setLong(position.coords.longitude)
            }, function(error) {
                console.error(error);
            }, {
                enableHighAccuracy: false,
                maximumAge: 0,
                timeout: Infinity
            });
        }
    }, [map]);

    useEffect(() => {
        if (info){
        mapsearch(info.swLatLng.lng,info.swLatLng.lat,info.neLatLng.lng,info.neLatLng.lat)
            .then((res) => {
                setCampings(res.data)
                let lst = []
                for (let i = 0; i < res.data.length; i++) {
                    lst.push(false)
                }
                setIsOpen(lst)
                setFalseList(lst)
            })
        }
    }, [info]);

    return (
        <>
            <div style={{ marginTop: "3%", marginBottom: "3%" }}>
                <Container style={{textAlignLast: "right", marginBottom: "1%"}}>
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
                        }}>
                        현위치 검색
                        </button>
                    )}
                </Container>
                
                <Map // 지도를 표시할 Container
                center={{ lat: lat, lng: long }}
                style={{
                    // 지도의 크기
                    width: "100%",
                    height: "600px",
                    borderRadius: "2%",
                }}
                level={8} // 지도의 확대 레벨
                onCreate={(map) => setMap(map)}
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
                                    ...falseList,
                                    [idx] : true
                                })
                            }
                            onMouseOut={
                                () => setIsOpen(falseList)
                            }
                        >
                            {isOpen[idx] && <div className="fw-bold" style={{ padding: "5px", color: "#000" }}>{data.faclt_nm}</div>}
                        </MapMarker>
                    ))}
                </Map>
            </div>
        </>
    );
}

export default Mapsearch;