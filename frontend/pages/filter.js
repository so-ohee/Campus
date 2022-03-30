import { Container, Col, Row, Card, Pagination, Button } from "react-bootstrap";
import CampingCard from "../components/Common/CampingCard";
import styles from "../styles/Recommend/Recommend.module.css";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from "axios";



function Filter() {
  const router = useRouter();
  const [campings, setCampings] = useState([])
  const [page, setPage] = useState('')
  const [totalPage, setTotalPage] = useState('')
  const [pageList, setPageList] = useState([])
  const url = 'https://j6c103.p.ssafy.io/django/api'
  const query = router.asPath.substring(0,router.asPath.lastIndexOf('=')+1)


  useEffect(() => {
    axios.get(`${url}${router.asPath}`)
    .then((res) => {
      setCampings(res.data.results) 
      setPage(Number(res.data.page))
      setTotalPage(Number(res.data.totalPage))
      makeList(res.data.page,res.data.totalPage)
    })
  }, [router.asPath]);

  const makeList = (p, t) => {
    let lst = []
    const start = parseInt((p-1)/5)*5+1
    for (let i = start; i < Math.min(start+5,t+1); i++) {
      lst.push(i)
    }
    setPageList(lst)
  }

  const moveCamping = (camping_id) => {
    router.push(`/campingplace/${camping_id}`)
  }

  return (
    <>
     검색결과입니다.
     <div>
       <Row>
        {campings.map((datas, index) => (
          <Card style={{ width: "21rem", height: "23rem", borderRadius: "5%", padding:'0px' }} key={index} onClick={() => moveCamping(datas.camping_id)}>
            {
              datas.first_image_url == null ? 
                <Card.Img variant="top" src="../../logo.png" style={{ width: "100%", height: "50%", borderRadius: "5% 5% 0% 0%" }} />
                : <Card.Img variant="top" src={datas.first_image_url} style={{width: "100%", height: "50%", borderRadius: "5% 5% 0% 0%"}} />
            }        
            
            <Card.Body>
                <Card.Title style={{ fontSize: "24px" }}>{datas.faclt_nm}</Card.Title>
                <Card.Subtitle
                  className="mb-2 text-muted"
                  style={{ fontSize: "14px" }}
                >
                    {datas.addr1}
                </Card.Subtitle>
                <Card.Text style={{ fontSize: "16px" }}>
                    {
                      datas.thema_envrn_cl !== null ? <a>#{`${datas.thema_envrn_cl}`.replaceAll(",", " #")}</a> : null
                    }
                </Card.Text>
            </Card.Body>
          </Card>
        ))}
        </Row>
      </div>
      
      <br></br>
      <Pagination >
        <Pagination.First 
          disabled={page === 1}
          onClick={() => router.push(`${query}${Math.max(1,pageList[0]-5)}`)}
        />
        <Pagination.Prev 
          disabled={page === 1}
          onClick={() => router.push(`${query}${page-1}`)}
        />
        {pageList.map((page_, idx) => (
          <Pagination.Item
              key={idx}
              id={`page-${idx}`}
              active={page_ === page}
              onClick={() => router.push(`${query}${page_}`)}
          >
              {page_}
          </Pagination.Item>
        ))}
        <Pagination.Next 
          disabled={page === totalPage}
          onClick={() => router.push(`${query}${page+1}`)}
        />
        <Pagination.Last 
          disabled={page === totalPage}
          onClick={() => router.push(`${query}${Math.min(totalPage,pageList[0]+5)}`)}
        />
      </Pagination>


    </>
  );
}

export default Filter;
