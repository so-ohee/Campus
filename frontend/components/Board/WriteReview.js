import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import styles from "/styles/Board/WriteReview.module.css";

function writereview() {

    return (
        
        <div>
            <Container>
                <h1 className={styles.boardlist_h1}>캠핑장 리뷰 작성</h1>
            </Container>
        </div>
    );
}

export default writereview;
