import { useState, useEffect } from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk"
import axios from "axios"
import { receiveCamping_in, receiveCamping_out } from "../../function/axios";
import { useRouter } from 'next/router';

function CampingMap(props) {

    const router = useRouter();

    const x = props.props.mapX
    const y = props.props.mapY
    const campingName = props.props.facltNm

    const [myX, setMyX] = useState('')
    const [myY, setMyY] = useState('')
    const [err, setErr] = useState(false)
    const [nowX, setNowX] = useState(x)
    const [nowY, setNowY] = useState(y)

    const markerImageSrc = "/mapicon.png"
    const falseList = {0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false}
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenMy, setIsOpenMy] = useState(false)
    const [isOpen1, setIsOpen1] = useState(falseList)
    const [isOpen2, setIsOpen2] = useState(falseList)
    const [isOpen3, setIsOpen3] = useState(falseList)
    const [isOpen4, setIsOpen4] = useState(falseList)

    const imageSize = { width: 22, height: 26 }
    const spriteSize = { width: 72, height: 208 }

    const [martPositions, setMartPositions] = useState([])
    const [martList, setMartList] = useState([])
    const martOrigin = { x: 10, y: 36 }

    const [csPositions, setCsPositions] = useState([])
    const [csList, setCsList] = useState([])
    const csOrigin = { x: 10, y: 180 }
  
    const [foodPositions, setFoodPositions] = useState([])
    const [foodList, setFoodList] = useState([])
    const foodOrigin = { x: 10, y: 144 }

    const [hospitalPositions, setHospitalPositions] = useState([])
    const [hospitalList, setHospitalList] = useState([])
    const hospitalOrigin = { x: 10, y: 72 }

    function clickMart() {
      if (martPositions.length === 0){
        setMartPositions(martList)
      }
      else{
        setMartPositions([])
      }
    }
    function clickCs() {
      if (csPositions.length === 0){
        setCsPositions(csList)
      }
      else{
        setCsPositions([])
      }
    }
    function clickFood() {
      if (foodPositions.length === 0){
        setFoodPositions(foodList)
      }
      else{
        setFoodPositions([])
      }
    }
    function clickHospital() {
      if (hospitalPositions.length === 0){
        setHospitalPositions(hospitalList)
      }
      else{
        setHospitalPositions([])
      }
    }
    function clickMyLocation() {
      if (err){
        alert('현재 위치를 확인할 수 없습니다. url창 왼쪽을 눌러 확인해주세요.')
      }else{
        // setNowX(x)
        // setNowY(y)
        setNowX(myX)
        setNowY(myY)
      }
    }
    function clickCamping() {
      setNowX(x)
      setNowY(y)
    }
  
  
    useEffect(() => {
      axios({
        method: 'get',
        url: `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=MT1&page=1&size=15&sort=distance&x=${x}&y=${y}&radius=10000`,
        headers: { Authorization: 'KakaoAK 755938934fdfd53eecb5a27918ac35e9' },
      })
        .then((res) => {
          // console.log(res);
          setMartList(res.data.documents)
          setMartPositions(res.data.documents)
        })
        .catch((err) => {
          console.log(err);
        })

      axios({
        method: 'get',
        url: `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=CS2&page=1&size=15&sort=distance&x=${x}&y=${y}&radius=10000`,
        headers: { Authorization: 'KakaoAK 755938934fdfd53eecb5a27918ac35e9' },
      })
        .then((res) => {
          // console.log(res);
          setCsList(res.data.documents)
          setCsPositions(res.data.documents)
        })
        .catch((err) => {
          console.log(err);
        })

      axios({
        method: 'get',
        url: `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&page=1&size=15&sort=distance&x=${x}&y=${y}&radius=10000`,
        headers: { Authorization: 'KakaoAK 755938934fdfd53eecb5a27918ac35e9' },
      })
        .then((res) => {
          // console.log(res);
          setFoodList(res.data.documents)
          setFoodPositions(res.data.documents)
        })
        .catch((err) => {
          console.log(err);
        })

      axios({
        method: 'get',
        url: `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=HP8&page=1&size=15&sort=distance&x=${x}&y=${y}&radius=10000`,
        headers: { Authorization: 'KakaoAK 755938934fdfd53eecb5a27918ac35e9' },
      })
        .then((res) => {
          // console.log(res);
          setHospitalList(res.data.documents)
          setHospitalPositions(res.data.documents)
        })
        .catch((err) => {
          console.log(err);
        })

      
        if (navigator.geolocation) { // GPS를 지원하면
          navigator.geolocation.getCurrentPosition(function(position) {
              setMyY(position.coords.latitude)
              setMyX(position.coords.longitude)
              // console.log('위도 : ' + lat + ' 경도 : ' + long)
          }, function(error) {
              console.error(error);
              setErr(true)
          }, {
              enableHighAccuracy: false,
              maximumAge: 0,
              timeout: Infinity
          });
      }

      },[])
    
    
    return (
      <>
        <div id="mapwrap" style={{marginTop: "1%"}}>
          <Map // 지도를 표시할 Container
            id={`map`}
            center={{
              // 지도의 중심좌표
              lat: nowY,
              lng: nowX,
            }}
            isPanto={true}
            style={{
              // 지도의 크기
              width: "100%",
              height: "600px",
              borderRadius: "2%"
            }}
            level={5} // 지도의 확대 레벨
          >
            {
              martPositions.map((data, idx) => (
                <MapMarker
                    key={idx}
                    position={{
                      lat: data.y,
                      lng: data.x,
                    }}
                    image={{
                        src: markerImageSrc,
                        size: imageSize,
                        options: {
                            spriteSize: spriteSize,
                            spriteOrigin: martOrigin,
                        },
                    }}
                    clickable={true}
                    onClick={() => window.open(data.place_url, '_blank')}
                    onMouseOver={
                        () => setIsOpen1({
                            ...falseList,
                            [idx]: true
                        })
                    }
                    onMouseOut={
                        () => setIsOpen1(falseList)
                    }
                >
                    {isOpen1[idx] && <div className="fw-bold" style={{ padding: "5px", color: "#000" }}>{data.place_name}</div>}
                </MapMarker>
            ))}

            {
              csPositions.map((data, idx) => (
                <MapMarker
                    key={idx}
                    position={{
                      lat: data.y,
                      lng: data.x,
                    }}
                    image={{
                        src: markerImageSrc,
                        size: imageSize,
                        options: {
                            spriteSize: spriteSize,
                            spriteOrigin: csOrigin,
                        },
                    }}
                    clickable={true}
                    onClick={() => window.open(data.place_url, '_blank')}
                    onMouseOver={
                        () => setIsOpen2({
                            ...falseList,
                            [idx]: true
                        })
                    }
                    onMouseOut={
                        () => setIsOpen2(falseList)
                    }
                >
                    {isOpen2[idx] && <div className="fw-bold" style={{ padding: "5px", color: "#000" }}>{data.place_name}</div>}
                </MapMarker>
              ))}
            {
              foodPositions.map((data, idx) => (
                <MapMarker
                    key={idx}
                    position={{
                      lat: data.y,
                      lng: data.x,
                    }}
                    image={{
                        src: markerImageSrc,
                        size: imageSize,
                        options: {
                            spriteSize: spriteSize,
                            spriteOrigin: foodOrigin,
                        },
                    }}
                    clickable={true}
                    onClick={() => window.open(data.place_url, '_blank')}
                    onMouseOver={
                        () => setIsOpen3({
                            ...falseList,
                            [idx]: true
                        })
                    }
                    onMouseOut={
                        () => setIsOpen3(falseList)
                    }
                >
                    {isOpen3[idx] && <div className="fw-bold" style={{ padding: "5px", color: "#000" }}>{data.place_name}</div>}
                </MapMarker>
              ))}
            {
              hospitalPositions.map((data, idx) => (
                <MapMarker
                    key={idx}
                    position={{
                      lat: data.y,
                      lng: data.x,
                    }}
                    image={{
                        src: markerImageSrc,
                        size: imageSize,
                        options: {
                            spriteSize: spriteSize,
                            spriteOrigin: hospitalOrigin,
                        },
                    }}
                    clickable={true}
                    onClick={() => window.open(data.place_url, '_blank')}
                    onMouseOver={
                        () => setIsOpen4({
                            ...falseList,
                            [idx]: true
                        })
                    }
                    onMouseOut={
                        () => setIsOpen4(falseList)
                    }
                >
                    {isOpen4[idx] && <div className="fw-bold" style={{ padding: "5px", color: "#000" }}>{data.place_name}</div>}
                </MapMarker>
              ))}
            


        {/* 캠핑장 */}
        <MapMarker 
            position={{
                lat: y,
                lng: x,
            }}
            clickable={true}
            onClick={() => window.open(`https://map.kakao.com/link/to/${campingName},${y},${x}`, '_blank')}
            onMouseOver={
                () => setIsOpen(true)
            }
            onMouseOut={
                () => setIsOpen(false)
            }
        >
            {isOpen && <div className="fw-bold" style={{ padding: "5px", color: "#000" }}>{campingName}</div>}
        </MapMarker>
        <MapMarker 
            position={{
                lat: myY,
                lng: myX,
            }}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markers_sprites2.png",
              size: {
                width: 33,
                height: 36,
              },
              options: {
                offset: {
                  x: 12,
                  y: 36,
                },
                spriteSize: {
                  width: 126,
                  height: 146,
                },
                spriteOrigin: {
                  x: 43,
                  y: 0,
                },
              }
            }}
            onMouseOver={
              () => setIsOpenMy(true)
            }
            onMouseOut={
              () => setIsOpenMy(false)
            }
        >
          { isOpenMy && <div className="fw-bold" style={{ padding: "5px", color: "#000" }}>내 위치</div> }
        </MapMarker>

          </Map>
        </div>
        <button onClick={clickMart}>
          마트
        </button>
        <button onClick={clickCs}>
          편의점
        </button>
        <button onClick={clickFood}>
          식당
        </button>
        <button onClick={clickHospital}>
          병원
        </button>
        <button onClick={clickMyLocation}>
          내 위치
        </button>
        <button onClick={clickCamping}>
          캠핑장 위치
        </button>

      </>
    )
  }

export default CampingMap;