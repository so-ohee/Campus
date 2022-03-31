import { useEffect, useState } from 'react';
import React from 'react';
import { Button, Container, Row, ButtonGroup, ToggleButton } from 'react-bootstrap';
import styles from "../styles/Survey/Survey.module.css";
import { useRouter } from 'next/router'
import  { sendSurvey }  from "../function/axios";


function survey() {
    const router = useRouter()

    const [lat, setLat] = useState(35.2040949)
    const [long, setLong] = useState(126.8071876)
    const [err, setErr] = useState(false)

    const [q1, setQ1] = useState('')
    const [q2, setQ2] = useState('')
    const [q3, setQ3] = useState('')
    const [q4, setQ4] = useState('')
  
    const radios1 = [
      { name: '예', value: '0' },
      { name: '아니오', value: '1' },
    ]
    const radios2 = [
        { name: '1시간 이내', value: '0' },
        { name: '1시간~2시간', value: '1' },
        { name: '2시간 이후', value: '2' },
      ]
    const radios3 = [
        { name: '산', value: '산' },
        { name: '숲', value: '숲' },
        { name: '계곡', value: '계곡' },
        { name: '해변', value: '해변' },
        { name: '강', value: '강' },
        { name: '도심', value: '도심' },
        { name: '섬', value: '섬' },
        { name: '호수', value: '호수' },
    ]
    const radios4 = [
        { name: '예', value: '0' },
        { name: '아니오', value: '1' },
      ]

    const onClickButton = () => {
        if (q1===''||q2===''||q3===''||q4===''){
            alert('모든 항목에 응답해주세요!')
        }
        else{
            const uid = localStorage.getItem("userUid")
            sendSurvey(q1,q2,q3,q4,uid,long,lat).then((res) => console.log(res.data))
            router.push('/recommend')
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("userUid")){
            router.push('/')
          }
        if (navigator.geolocation) { // GPS를 지원하면
            navigator.geolocation.getCurrentPosition(function(position) {
                setLat(position.coords.latitude)
                setLong(position.coords.longitude)
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
    }, []);

    return (
        <>
            <div className={styles.survey_div1}>
                    <h1 style={{fontWeight: "bold"}}>설문</h1>
            </div>
            
            <Container className={styles.survey_container}>
                <div className={styles.survey_div2}>
                    <Row>
                        <h4 style={{ fontWeight: "bold" }}>1. 장비가 있나요?</h4>
                    </Row>
                    <Row>
                        {radios1.map((radio, idx) => (
                        <ToggleButton
                            className={styles.survey_toggle_button}
                            key={idx}
                            id={`q1-${idx}`}
                            type="radio"
                            variant='outline-success'
                            name="radio1"
                            value={radio.value}
                            checked={q1 === radio.value}
                            onChange={(e) => setQ1(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                        ))}
                    </Row>
                </div>
                <div className={styles.survey_div2}>
                    <Row>
                        <h4 style={{ fontWeight: "bold" }}>2. 소요시간은 얼마가 좋나요?</h4>
                    </Row>
                    <Row>
                        {radios2.map((radio, idx) => (
                        <ToggleButton
                            className={styles.survey_toggle_button}
                            key={idx}
                            id={`q2-${idx}`}
                            type="radio"
                            variant='outline-success'
                            name="radio2"
                            value={radio.value}
                            checked={q2 === radio.value}
                            onChange={(e) => setQ2(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                        ))}
                    </Row>
                    {err && <span>※ 현재 위치를 확인할 수 없습니다. url창 왼쪽을 눌러 확인해주세요.</span>} 
                </div>
                <div className={styles.survey_div2}>
                    <Row>
                        <h4 style={{ fontWeight: "bold" }}>3. 어떤 환경을 제일 좋아하시나요?</h4>
                    </Row>
                    <Row>
                        {radios3.map((radio, idx) => (
                        <ToggleButton
                            className={styles.survey_toggle_button}
                            key={idx}
                            id={`q3-${idx}`}
                            type="radio"
                            variant='outline-success'
                            name="radio3"
                            value={radio.value}
                            checked={q3 === radio.value}
                            onChange={(e) => setQ3(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                        ))}
                    </Row>
                </div>
                <br/><br/>
                <div className={styles.survey_div2}>
                    <Row>
                        <h4 style={{ fontWeight: "bold" }}>4. 반려견이 있나요?</h4>
                    </Row>
                    <Row>
                        {radios4.map((radio, idx) => (
                        <ToggleButton
                            className={styles.survey_toggle_button}
                            key={idx}
                            id={`q4-${idx}`}
                            type="radio"
                            variant='outline-success'
                            name="radio4"
                            value={radio.value}
                            checked={q4 === radio.value}
                            onChange={(e) => setQ4(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                        ))}
                    </Row>
                </div>
            </Container>
            
            <div className={styles.survey_div4}>
                <Button 
                    onClick={onClickButton}
                    variant='outline-success'
                >완료</Button>
            </div>
        </>
    );
}

export default survey;