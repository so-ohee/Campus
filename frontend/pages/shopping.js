import { useEffect, useState } from 'react';
import { Col, Container, Row, Pagination } from 'react-bootstrap';
import  ShoppingCard  from "../components/Common/ShoppingCard";
import  {Shoppingcamp}  from "../function/axios";
import styles from "../styles/Shopping/Shopping.module.css";

function Shopping() {

    const [dummy, setDummy] = useState([]);

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState('')
    const [pageList, setPageList] = useState([])

    
    // 새로고침 또는 페이진 전환 시 초기 위치
    useEffect(() => {
        window.scrollTo(0, 500);
    }, [page]);

    useEffect(() => {
        Shoppingcamp(1).then((res) => {
            setDummy(res.data.items)
            setTotalPage(res.data.totalPage)
            makeList(1,res.data.totalPage)
        });
    }, [])
    
    const onSearch = (p) => {
        setPage(p)
        Shoppingcamp(p)
        .then((res) => {
            // console.log(res)
            if (res.data.items){
                setDummy(res.data.items)
                setTotalPage(res.data.totalPage)
                makeList(p,res.data.totalPage)
            }else{
                setDummy([])
            }
        })
    }

    const makeList = (p, t) => {
        let lst = []
        const start = parseInt((p-1)/5)*5+1
        for (let i = start; i < Math.min(start+5,t+1); i++) {
            lst.push(i)
        }
        setPageList(lst)
    }

    return (
        <>
            <Container style={{height: "1750px", marginTop: "2%", marginBottom: "2%"}}>
                <h1 className={styles.shopping_h1}>캠핑 용품 쇼핑</h1>
                    <Row>
                        {dummy.map((element, index) => {
                            return (
                            <Col sm key={index} style={{textAlign: "-webkit-center"}}>
                                <ShoppingCard
                                    image={element.image}
                                    link={element.link}
                                    price={element.price}
                                    title={element.title}
                                />
                            </Col>
                            );
                        })}
                    </Row>
            </Container>

            <Pagination className={styles.reviewcamp_pagination}>
                <Pagination.First 
                    disabled={page === 1}
                    onClick={() => onSearch(Math.max(1,pageList[0]-5))}
                />
                <Pagination.Prev 
                    disabled={page === 1}
                    onClick={() => onSearch(page-1)}
                />
                {pageList.map((page_, idx) => (
                    <Pagination.Item
                        key={idx}
                        id={`page-${idx}`}
                        active={page_ === page}
                        onClick={() => onSearch(page_)}
                    >
                        {page_}
                    </Pagination.Item>
                ))}
                <Pagination.Next 
                    disabled={page === totalPage || totalPage === undefined}
                    onClick={() => onSearch(page+1)}
                />
                <Pagination.Last 
                    disabled={page === totalPage || totalPage === undefined}
                    onClick={() => onSearch(Math.min(totalPage,pageList[0]+5))}
                />
            </Pagination>
        </>
    );
}

export default Shopping;