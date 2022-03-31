import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import styles from "../../styles/Search/AreaSearch.module.css";
import  { searchArea }  from "../../function/axios";
import { useRouter } from 'next/router';

function Areasearch() {
    const router = useRouter();

    const [keyword, setKeyword] = useState('')
    const [addr1, setAddr1] = useState("전체");
    const [addr2, setAddr2] = useState("전체");
    const [addr2List, setAddr2List] = useState(['전체'])

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

    const addr2_1 = ['전체', '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']
    




    const handleChange = (event) => {
        setAddr1(event.target.value);
        setAddr2("전체");
        setAddr2List(['전체'])
        if (event.target.value === '전체'){
            setAddr2List(['전체'])
        }
        if (event.target.value === '서울시'){
            setAddr2List(addr2_1)
        }
        
    };
    const handleChange2 = (event) => {
        setAddr2(event.target.value);
    };

    const onSearch = () => {
        // console.log(addr1,addr2,keyword)
        searchArea(addr1,addr2,keyword,1)
        .then((res) => console.log(res))
        router.push(`/searcharea?addr1=${addr1}&addr2=${addr2}&keyword=${keyword}&page=1`)
    }

    return (
        <>

            <div className={styles.areasearch_div1}>
                <Row>
                    <Col className={styles.areasearch_col1}>
                        <div className={styles.areasearch_div2}>
                            <FormControl variant="standard" sx={{ width: 200 }}>
                                <InputLabel style={{ paddingLeft: "10%"}} id="demo-simple-select-standard-label">지역1</InputLabel>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={addr1}
                                onChange={handleChange}
                                label="area"
                                >
                                {addr1List.map((datas, index) => (
                                    <MenuItem 
                                        key={index}
                                        value={datas}
                                    >
                                        {datas}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </div>
                    </Col>
                    <Col className={styles.areasearch_col1}>
                        <div className={styles.areasearch_div2}>
                            <FormControl variant="standard" sx={{ width: 200 }}>
                                <InputLabel style={{ paddingLeft: "10%"}} id="demo-simple-select-standard-label">지역2</InputLabel>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={addr2}
                                onChange={handleChange2}
                                label="area"
                                >
                                {addr2List.map((datas, index) => (
                                    <MenuItem 
                                        key={index}
                                        value={datas}
                                    >
                                        {datas}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </div>
                    </Col>
                </Row>    
                <Row className={styles.areasearch_row}>
                    <Form.Group className={styles.areasearch_form}>
                        <Form.Control 
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="검색어를 입력해주세요." />
                    </Form.Group>
                </Row>
                <Button
                    onClick={() => onSearch()}
                >
                    검색
                </Button>
            </div>
        </>
    );
}

export default Areasearch;