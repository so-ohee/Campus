import { useEffect, useState } from 'react';
import { Container, Col, Row, Pagination } from "react-bootstrap";
import styles from "../../styles/CampingPlace/CampingReview.module.css";
import { viewBoard } from "../../function/axios";
import axios from "axios"

function CampingReview(props) {

    // 댓글 조회
    const [dummy, setDummy] = useState([]);

    // 블로그
    const [blogs, setBlogs] = useState([])
    const sigungu = props.props.sigunguNm
    const campingName = props.props.facltNm
    const [blogPage, setBlogPage] = useState(1)

    useEffect(() => {
        viewBoard(props.props.campingId).then((res) => setDummy(res.data.board));
        axios({
            method: 'get',
            url: `https://dapi.kakao.com/v2/search/blog?query=${sigungu} ${campingName}&size=10`,
            headers: { Authorization: 'KakaoAK 755938934fdfd53eecb5a27918ac35e9' },
        })
            .then((res) => {
            console.log(res);
            setBlogs(res.data.documents)
            })
            .catch((err) => {
            console.log(err);
        })
    },[])

    return (
        <>
            <Container>
                <div className={styles.campingreview_div}>
                    {
                        dummy !== undefined ? 
                            (
                                dummy.map((element, index) => {
                                    return (
                                        <div className={styles.campingreview_row} key={index}>
                                            <Row>
                                                <Col xs={1}>
                                                    <img className={styles.campingreview_profile} src={element.profile} />
                                                </Col>
                                                <Col xs={8}>
                                                    <img className={styles.campingreview_star} src="../../star.png" />
                                                    <h5>{element.name}</h5>
                                                </Col>
                                                <Col xs={3} style={{textAlignLast: "right"}}>
                                                    <h5>{element.createTime}</h5>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <h5 className={styles.campingreview_review}>{element.title}</h5>
                                            </Row>
                                        </div>
                                    );
                                })
                            ) : 
                            (
                                <div className={styles.campingreview_comment}>
                                    <h1 style={{textAlign: "center"}}>댓글이 없습니다</h1>
                                </div>
                            )
                    }
                </div>
                
            </Container>
            <h2 className="fw-bold">블로그 리뷰</h2>
            <hr></hr>
            <div>
                {blogs.slice(blogPage*5-5,blogPage*5).map((element, index) => {
                    return (
                        <div key={index}>
                            <div className="d-flex ">
                                { element.thumbnail !== "" ?
                                    <div  style={{ width: "130px", height:"130px"}} >
                                    <img  src={element.thumbnail} onClick={() => window.open(element.url, '_blank')} style={{cursor:"pointer"}}/>
                                    </div>
                                : null}
                                <div className='ms-1 mt-1'>
                                    <h5 className="fw-bold" onClick={() => window.open(element.url, '_blank')} style={{cursor:"pointer"}}>
                                        {element.title.replace(/(<([^>]+)>)/ig,"").replace(/&#34;/ig,'"').replace(/&#39;/ig,"'").replace(/&lt;/ig,'<').replace(/&gt;/ig,'>')}
                                    </h5>
                                    {element.contents.replace(/(<([^>]+)>)/ig,"").replace(/&#34;/ig,'"').replace(/&#39;/ig,"'").replace(/&lt;/ig,'<').replace(/&gt;/ig,'>')}
                                    <h5 className="mt-2 mb-0">{element.datetime.slice(0,10)}</h5>
                                </div>
                            </div>
                        <hr></hr>
                        </div>
                    );
                })}
            </div>
            <Pagination style={{justifyContent: "center"}}>
                <Pagination.Item
                    active={blogPage === 1}
                    onClick={()=> setBlogPage(1)}
                >1</Pagination.Item>
                <Pagination.Item
                    active={blogPage === 2}
                    onClick={()=> setBlogPage(2)}
                >2</Pagination.Item>
            </Pagination>
        </>
    );
}

export default CampingReview;
