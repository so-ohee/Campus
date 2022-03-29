import { Container, Col, Row } from "react-bootstrap";
import CampingCard from "../components/Common/CampingCard";
import styles from "../styles/Recommend/Recommend.module.css";

const dummy = [
  {
    title: "달천공원오토캠핑장",
    address: "강원도 횡성군 갑천면 외갑천로 301",
    hashtag: ["일출명소", "일몰명소", "봄꽃여행", "여름물놀이", "걷기길"],
  },
  {
    title: "청풍호오토캠핑장",
    address: "충청북도 제천시 청풍면 용곡길 211번길 2",
    hashtag: ["짚라인", "체험형", "캠핑요리"],
  },
  {
    title: "마음이 머무는 곳",
    address: "강원도 화천군 사내면 포화로 653-76",
    hashtag: ["아로마향초만들기", "천연염색", "캠핑요리"],
  },
];

function Filter() {
  return (
    <>
     검색결과입니다.
    </>
  );
}

export default Filter;
