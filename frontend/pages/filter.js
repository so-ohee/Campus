import { Container, Col, Row } from "react-bootstrap";
import CampingCard from "../components/Common/CampingCard";
import styles from "../styles/Recommend/Recommend.module.css";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from "axios";


function Filter() {
  const router = useRouter();
  const [campings, setCampings] = useState([])

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api${router.asPath}`).then((res) => setCampings(res.data.results))
  }, []);

  return (
    <>
     검색결과입니다.
     <div>
        {campings.map((camping, idx) => (
          <div>
            {camping.faclt_nm}
          </div>
        ))}
      </div>
    </>
  );
}

export default Filter;
