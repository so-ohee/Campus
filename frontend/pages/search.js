import { useEffect, useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import styles from "../styles/Search/Search.module.css";
import AreaSearch from '../components/Search/AreaSearch.js';
import FliterSearch from '../components/Search/FliterSearch.js';
import MapSearch from '../components/Search/MapSearch.js';

function search() {

    const [page, setPage] = useState("");
    // 새로고침 또는 페이진 전환 시 초기 위치
    useEffect(() => {
        window.scrollTo(0, 500);
    }, [page]);
    
    return (
        
        <div>
            <Container style={{ height: "1300px" }}>
                <div className={styles.search_div1}>
                    <h1 style={{fontWeight: "bold"}}>캠핑장 검색</h1>
                </div>

                <div className={styles.search_div2}>
                    <Tabs style={{width: "1320px"}} defaultActiveKey="map" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="area" title="지역">
                            <AreaSearch />
                        </Tab>
                        <Tab eventKey="filter" title="필터링">
                            <FliterSearch />
                        </Tab>
                        <Tab eventKey="map" title="지도">
                            <MapSearch />
                        </Tab>
                    </Tabs>
                </div>
            </Container>
        </div>
    );
}

export default search;