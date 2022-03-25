import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import styles from "../../styles/Search/AreaSearch.module.css";

function Areasearch() {

    const [area, setArea] = useState("");
    const [thema, setThema] = useState("");
    const [content, setContent] = useState("");
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    
    return (
        <>
            <div className={styles.areasearch_div1}>
                <Row>
                    <Col className={styles.areasearch_col1}>
                        <div className={styles.areasearch_div2}>
                            <FormControl variant="standard" sx={{ width: 200 }}>
                                <InputLabel style={{ paddingLeft: "10%"}} id="demo-simple-select-standard-label">지역</InputLabel>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={area}
                                onChange={handleChange}
                                label="area"
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Col>
                    <Col className={styles.areasearch_col2}>
                        <div className={styles.areasearch_div2}>
                            <FormControl variant="standard" sx={{ width: 200 }}>
                                <InputLabel style={{ paddingLeft: "10%"}} id="demo-simple-select-standard-label">테마</InputLabel>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={thema}
                                onChange={handleChange}
                                label="thema"
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Col>
                    <Col className={styles.areasearch_col3}>
                        <div className={styles.areasearch_div2}>
                            <FormControl variant="standard" sx={{ width: 200 }}>
                                <InputLabel style={{ paddingLeft: "10%"}} id="demo-simple-select-standard-label">내용3</InputLabel>
                                <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={content}
                                onChange={handleChange}
                                label="content"
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Col>
                </Row>    
                <Row className={styles.areasearch_row}>
                    <Form.Group className={styles.areasearch_form}>
                        <Form.Control placeholder="검색어를 입력해주세요." />
                    </Form.Group>
                </Row>
            </div>
        </>
    );
}

export default Areasearch;