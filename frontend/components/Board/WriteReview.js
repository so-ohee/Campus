import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import styles from "/styles/Board/WriteReview.module.css";
import ReactStars from "react-rating-stars-component";

function writereview() {

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };
    
    return (
        <div>
            <Container>
                <h1 className={styles.writereview_h1}>캠핑장 리뷰 작성</h1>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                />,
            </Container>
        </div>
    );
}

export default writereview;
