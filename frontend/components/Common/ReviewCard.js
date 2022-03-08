import { Card } from "react-bootstrap";
import styles from "/styles/ReviewCard.module.css";

function ReviewCard(params) {
    return (
        <>
            <Card style={{ width: "20rem" }}>
                <Card.Img variant="top" src="/logo.png" />
                <hr />
                <Card.Img className={styles.reviewcard_profile} variant="top" src="/profile.png" />
                <Card.Body>
                    <Card.Title style={{ fontSize: "24px" }}>{params.title}</Card.Title>
                    <Card.Img variant="top" src="/star.png" style={{width: "40%", marginBottom: "3%"}} />
                    <Card.Text style={{ fontSize: "16px" }}>
                        {params.review}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default ReviewCard;
