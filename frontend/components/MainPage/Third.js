import { Container } from 'react-bootstrap';
import styles from "/styles/MainPageThird.module.css";

function Third() {
    return (
        <div className={styles.third_main}>
            <Container>
                <h1 className={styles.third_h1}>리뷰로 보는 캠핑장 TOP 3</h1>
            </Container>
        </div>
    );
}
export default Third;