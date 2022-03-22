import axios from "axios";

const url = "http://localhost:8080/";

// 회원 기능 
// 로그인 (회원 정보 DB에 저징)
export const sendUserUid = async (userUid, displayName, photoURL) => {
    const url2 = "http://localhost:8080/user";

    let data = {
        name: displayName,
        profile: photoURL,
        userUid: userUid,
    }
    axios
    .post(url2,  JSON.stringify(data), {
        headers: {
            "Content-Type": `application/json`,
        },
        proxy: url2
        })
        .then((res) => {
            console.log("로그인 성공 & 회원정보 DB 전송 완료");
        }
    );
};

// 회원 정보 불러오기
export async function bringUser(userUid) {
    let res = await axios.get(`${url}` + `/` + `user` + `/` + `${userUid}`)
    return res;
}



// 게시판 기능
// 추천 캠핑장 (메인화면 켐핑장 추천 기능 구현)
export const viewCamping = async () => {
    return await axios.get(`${url}`+ `/` + `mainRecommend`)
};

// 게시판 목록 출력 (전체)
export const campingBoard = async () => {
    return await axios.get(`${url}`+ `/` + `board`)
}

// 게시판 목록 출력 (상세조회)
export const campingBoardMore = async (boardId) => {
    return await axios.get(`${url}`+ `/` + `board`+ `/` + `${boardId}`)
}

// 댓글 조회
export const commentSearch = async (boardId) => {
    return await axios.get(`${url}`+ `/` + `comment?boardId=` + `${boardId}`)
}