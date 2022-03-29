import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Container, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import styles from "../../styles/Search/FliterSearch.module.css";
import { useRouter } from 'next/router'

function Filtersearch() {
    const router = useRouter()

    const [q1, setQ1] = useState([])
    const [q2, setQ2] = useState([])
    const [q3, setQ3] = useState([])
    const [q4, setQ4] = useState('')
    const [q5, setQ5] = useState('0')
  
    const radios1 = [
      { name: '일반야영장', value: '0' },
      { name: '자동차야영장', value: '1' },
      { name: '카라반', value: '2' },
      { name: '글램핑', value: '3' },
    ]
    const radios2 = [
        { name: '산', value: '0' },
        { name: '숲', value: '1' },
        { name: '계곡', value: '2' },
        { name: '해변', value: '3' },
        { name: '강', value: '4' },
        { name: '도심', value: '5' },
        { name: '섬', value: '6' },
        { name: '호수', value: '7' },
      ]
    const radios3 = [
        { name: '놀이터', value: '0' },
        { name: '편의점', value: '1' },
        { name: '무선인터넷', value: '2' },
        { name: '물놀이장', value: '3' },
        { name: '온수', value: '4' },
        { name: '운동시설', value: '5' },
        { name: '전기', value: '6' },
    ]
    const radios4 = [
        { name: '대형견', value: '0' },
        { name: '소형견', value: '1' },
        { name: '상관 없음', value: '2' },
      ]
    const radios5 = [
        { name: '인기순', value: '0' },
        { name: '가까운순', value: '1' },
        { name: '가나다순', value: '2' },
      ]

    const handleChange1 = (val) => setQ1(val);
    const handleChange2 = (val) => setQ2(val);
    const handleChange3 = (val) => setQ3(val);

    const onSearchResults = () => {
        if (q1.length > 0){
            const Q1 = '&induty=' + q1.join('&induty=')
        }else{
            const Q1 = ''
        }
        if (q2.length > 0){
            const Q2 = '&lct=' + q2.join('&lct=')
        }else{
            const Q2 = ''
        }
        if (q3.length > 0){
            const Q3 = '&sbrs=' + q3.join('&sbrs=')
        }else{
            const Q3 = ''
        }
        if (q4.length !== ''){
            const Q4 = '&animal=' + q4
        }else{
            const Q4 = ''
        }
        if (q5.length !== ''){
            const Q5 = '&order=' + q5
        }else{
            const Q5 = ''
        }

        const url = ['/filter?', Q1, Q2, Q3, Q4, Q5, '&page=1'].join('')
        router.push(url)
    }

    return (
        <Container className={styles.filtersearch_container}>
            <div className={styles.filtersearch_div}>
                <Row>
                    <h4 style={{ fontWeight: "bold" }}>숙박 구분</h4>
                </Row>
                <Row>
                    <ToggleButtonGroup type="checkbox" value={q1} onChange={handleChange1}>
                        {radios1.map((radio, idx) => (
                        <ToggleButton 
                            key={idx}
                            style={{ marginRight:'10px'}}
                            variant='outline-success'
                            id={`q1-${idx}`}
                            value={radio.value}
                        >
                            {radio.name}
                        </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Row>
            </div>
            <div className={styles.filtersearch_div}>
                <Row>
                    <h4 style={{ fontWeight: "bold" }}>환경</h4>
                </Row>
                <Row>
                    <ToggleButtonGroup type="checkbox" value={q2} onChange={handleChange2}>
                        {radios2.map((radio, idx) => (
                        <ToggleButton 
                            key={idx}
                            style={{ marginRight:'10px'}}
                            variant='outline-success'
                            id={`q2-${idx}`}
                            value={radio.value}
                        >
                            {radio.name}
                        </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Row>
            </div>
            <div className={styles.filtersearch_div}>
                <Row>
                    <h4 style={{ fontWeight: "bold" }}>편의 시설</h4>
                </Row>
                <Row>
                    <ToggleButtonGroup type="checkbox" value={q3} onChange={handleChange3}>
                        {radios3.map((radio, idx) => (
                        <ToggleButton 
                            key={idx}
                            style={{ marginRight:'10px'}}
                            variant='outline-success'
                            id={`q3-${idx}`}
                            value={radio.value}
                        >
                            {radio.name}
                        </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Row>
            </div>
            <div className={styles.filtersearch_div}>
                <Row>
                    <h4 style={{ fontWeight: "bold" }}>반려견 출입</h4>
                </Row>
                <Row>
                    {radios4.map((radio, idx) => (
                    <ToggleButton 
                        className={styles.filtersearch_toggle_button}
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
            <div className={styles.filtersearch_div}>
                <Row>
                    <h4 style={{ fontWeight: "bold" }}>정렬 조건</h4>
                </Row>
                <Row>
                    {radios5.map((radio, idx) => (
                    <ToggleButton 
                        className={styles.filtersearch_toggle_button}
                        key={idx}
                        id={`q5-${idx}`}
                        type="radio"
                        variant='outline-success'
                        name="radio5"
                        value={radio.value}
                        checked={q5 === radio.value}
                        onChange={(e) => setQ5(e.currentTarget.value)}
                    >
                        {radio.name}
                    </ToggleButton>
                    ))}
                </Row>
            </div>
            <div className={styles.filtersearch_div2}>
                <Button 
                    style={{background: "#007D0D"}}
                    onClick={onSearchResults}
                >검색
                </Button>
            </div>
        </Container>
    );
}

export default Filtersearch;