import { useEffect, useState } from 'react';
import { Container, Col, Row } from "react-bootstrap";
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

    useEffect(() => {
        viewBoard(props.props.campingId).then((res) => setDummy(res.data.board));
        axios({
            method: 'get',
            url: `https://dapi.kakao.com/v2/search/blog?query=${sigungu} ${campingName}&size=5`,
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
                        dummy === null ? 
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

            <div>
                {blogs.map((element, index) => {
                    return (
                        <div key={index} onClick={() => window.open(element.url, '_blank')} style={{cursor:"pointer"}}>
                            <img  src={element.thumbnail} />
                            <div >
                                {element.title.replace(/(<([^>]+)>)/ig,"").replace(/&#34;/ig,'"')}
                            </div>
                            {element.contents.replace(/(<([^>]+)>)/ig,"").replace(/&#34;/ig,'"')}
                            <h5>{element.datetime.slice(0,10)}</h5>
                        </div>
                    );
                })}
            </div>

        </>
    );
}

export default CampingReview;
