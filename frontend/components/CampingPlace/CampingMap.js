import styled from "@emotion/styled";
import { useEffect } from "react";
import { Container } from 'react-bootstrap';

function HouseMap() {
  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(36.0, 128.0),
          level: 13,
        };

        const map = new window.kakao.maps.Map(container, options);
        // const markerPosition = new window.kakao.maps.LatLng(
        //   latitude,
        //   longitude,
        // );
        // const marker = new window.kakao.maps.Marker({
        //   position: markerPosition,
        // });
        // marker.setMap(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, []);

  return (
    <Container>
      <MapContainer id="map" />
    </Container>
  );
}

const MapContainer = styled.div`
  aspect-ratio: 320 / 220;
  margin-top: 1%;
  margin-bottom: 10%;
`;

export default HouseMap;
