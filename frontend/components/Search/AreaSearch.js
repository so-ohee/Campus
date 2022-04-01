// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row, Button, Container } from 'react-bootstrap';
import styles from "../../styles/Search/AreaSearch.module.css";
import  { searchArea }  from "../../function/axios";
import { useRouter } from 'next/router';
import CampingCard from "../Common/CampingCard";

function Areasearch() {

    const router = useRouter();
    const [keyword, setKeyword] = useState('')
    const [addr1, setAddr1] = useState("전체");
    const [addr2, setAddr2] = useState("전체");
    const [addr2List, setAddr2List] = useState(['전체'])
    const [datas, setDatas] = useState([]);

    const addr1List = [
        '전체',
        '서울시',
        '부산시',
        '대구시',
        '인천시',
        '광주시',
        '대전시',
        '울산시',
        '세종시',
        '경기도',
        '강원도',
        '충청북도',
        '충청남도',
        '전라북도',
        '전라남도',
        '경상북도',
        '경상남도',
        '제주도'
    ]

    const addr2AllList = [
        ['전체'],
        ['전체', '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
        ['전체', '강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구'],
        ['전체', '남구', '달서구', '달성군', '동구', '북구', '상주', '서구', '수성구', '중구'],
        ['전체', '강화군', '계양구', '남구', '남동구', '동구', '부평구', '서구', '연수구', '옹진군', '중구'],
        ['전체', '광산구', '남구', '동구', '북구', '서구'],
        ['전체', '대덕구', '동구', '서구', '유성구', '중구'],
        ['전체', '남구', '동구', '북구', '울주군', '중구'],
        ['전체', '금남면', '세종시', '소정면', '연서면', '전동면'],
        ['전체', '가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '양평군', '여주시', '연천군', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시'],
        ['전체', '강릉시', '고성군', '동해시', '삼척시', '속초시', '양구군', '양양군', '영월군', '원주시', '인제군', '정선군', '철원군', '춘천시', '태백시', '평창군', '홍천군', '화천군', '횡성군'],
        ['전체', '괴산군', '단양군', '보은군', '영동군', '옥천군', '음성군', '제천시', '증평군', '진천군', '청원군', '청주시', '충주시'],
        ['전체', '계룡시', '공주시', '금산군', '논산시', '당진시', '보령시', '부여군', '서산시', '서천군', '아산시', '예산군', '천안시', '청양군', '태안군', '홍성군'],
        ['전체', '고창군', '군산시', '김제시', '남원시', '무주군', '부안군', '순창군', '완주군', '익산시', '임실군', '장수군', '전주시', '정읍시', '진안군'],
        ['전체', '강진군', '고흥군', '곡성군', '광양시', '구례군', '나주시', '담양군', '목포시', '무안군', '보성군', '순천시', '신안군', '여수시', '영광군', '영암군', '완도군', '장성군', '장흥군', '진도군', '함평군', '해남군', '화순군'],
        ['전체', '경산시', '경주시', '고령군', '구미시', '군위군', '김천시', '문경시', '봉화군', '상주시', '성주군', '안동시', '영덕군', '영양군', '영주시', '영천시', '예천군', '울릉군', '울진군', '의성군', '청도군', '청송군', '칠곡군', '포항시'],
        ['전체', '거제시', '거창군', '고성군', '김해시', '남해군', '밀양시', '사천시', '산청군', '양산시', '의령군', '진주시', '창녕군', '창원시', '통영시', '하동군', '함안군', '함양군', '합천군'],
        ['전체', '서귀포시', '제주시'],
    ]

    const handleChange = (event) => {
        setAddr1(event.target.value);
        setAddr2("전체");
        setAddr2List(addr2AllList[addr1List.indexOf(event.target.value)])
    };
    const handleChange2 = (event) => {
        setAddr2(event.target.value);
    };

    const onSearch = () => {
        document.location.reload(true)
        searchArea(addr1,addr2,keyword,1)
        .then((res) => setDatas(res.data.campsite))
        // router.push(`/searcharea?addr1=${addr1}&addr2=${addr2}&keyword=${keyword}&page=1`)
    }

    console.log(datas);

    return (
        <>
            <div className={styles.areasearch_div1}>
                <Row>
                    <Col xs={6} className={styles.areasearch_col1}>
                    <Form.Select style={{width:"80%"}} value={addr1} onChange={handleChange}>
                        {addr1List.map((datas, index) => (
                            <option key={index} value={datas}>{datas}</option>
                        ))}
                    </Form.Select>
                    </Col>
                    <Col xs={6} className={styles.areasearch_col1}>
                        <Form.Select style={{width:"80%"}} value={addr2} onChange={handleChange2}>
                            {addr2List.map((datas, index) => (
                                <option key={index}  value={datas}>{datas}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>    
                <Row className={styles.areasearch_row}>
                    <Col xs={10} className={styles.areasearch_col2}>
                    <Form.Group className={styles.areasearch_form}>
                        <Form.Control style={{width:"120%"}} onChange={(e) => setKeyword(e.target.value)} placeholder="검색어를 입력해주세요." />
                    </Form.Group>
                    </Col>
                    <Col xs={2} className={styles.areasearch_col3}>
                        <Button onClick={() => onSearch()}>검색</Button>
                    </Col>
                </Row>
            </div>

            <Container>
                <Row>
                    {
                        datas && (datas.map((element, index) => {
                            return (
                                <Col sm key={index} style={{marginTop: "3%"}}>
                                    <CampingCard
                                        campingId={element.campingId}
                                        firstImageUrl={element.firstImageUrl}
                                        title={element.facltNm}
                                        address={element.addr1}
                                        hashtag={element.themaEnvrnCl}
                                    />
                                </Col>
                            );
                        }))
                    }
                </Row>
            </Container>
        </>
    );
}

export default Areasearch;