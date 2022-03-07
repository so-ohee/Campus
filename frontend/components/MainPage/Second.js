import { Container, Row, Col } from 'react-bootstrap';
import styles from '/styles/MainPageSecond.module.css';

function Second() {
    return (
        <div className={styles.second_main}>
            <Container>
                <h1 className={styles.second_h1}>가고싶은 캠핑장을 지금 찾아보세요</h1>
                <Row id={styles.second_row}>
                    <Col>
                        <Row>
                            <Col xs={3}>
                            <img className={styles.second_pic} src="/fire.png" />
                            </Col>
                            <Col xs={9} id={styles.second_col}>
                                <div className={styles.second_div}>
                                    <h4 className={styles.second_h4}>알고리즘으로 찾는 캠핑장</h4>
                                    <h6 className={styles.second_h6}>Cras sit amet nibh libero
                                        , in gravida nulla. Nulla vel metus
                                        scelerisque ante sollicitudin. </h6>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col xs={3}>
                            <img className={styles.second_pic} src="/tent.png" />
                            </Col>
                            <Col xs={9} id={styles.second_col}>
                                <div className={styles.second_div}>
                                    <h4 className={styles.second_h4}>다양한 종류의 캠핑장</h4>
                                    <h6 className={styles.second_h6}>Cras sit amet nibh libero
                                    , in gravida nulla. Nulla vel metus
                                    scelerisque ante sollicitudin. </h6>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col xs={3}>
                            <img className={styles.second_pic} src="/lamp.png" />
                            </Col>
                            <Col xs={9} id={styles.second_col}>
                                <div className={styles.second_div}>
                                    <h4 className={styles.second_h4}>생각이 안나 ~~</h4>
                                    <h6 className={styles.second_h6}>Cras sit amet nibh libero
                                        , in gravida nulla. Nulla vel metus
                                        scelerisque ante sollicitudin. </h6>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default Second;