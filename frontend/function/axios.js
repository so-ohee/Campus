import axios from "axios";

const url = "http://j6c103.p.ssafy.io:8080/";

// ************************************ 회원 기능 ************************************
// 로그인 (회원 정보 DB에 저징)
export const sendUserUid = async (userUid, displayName, photoURL) => {
    const url2 = "http://j6c103.p.ssafy.io:8080/user";

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
    let res = await axios.get(`${url}`+ `user` + `/` + `${userUid}`)
    return res;
}

// 프로필 사진 변경
export async function changePic(userUid, formData) {
    console.log(formData);
    const url2 = "http://j6c103.p.ssafy.io:8080/user/";

    await axios({
        method: 'put',
        url: url2 + `${userUid}`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }).then((res) => console.log(res));
}

// 아이디 변경
export async function changeProfileName(name, userUid) {

    const url2 = url + "http://j6c103.p.ssafy.io:8080/user/";

    let data = {
        name: name,
        userUid: userUid,
    }
    axios
    .put(url2,  JSON.stringify(data), {
        headers: {
            "Content-Type": `application/json`,
        },
        proxy: url2
        })
        .then((res) => {
            console.log("로그인 성공 & 회원정보 DB 전송 완료");
    });
}

// 회원탈퇴
export const memberDelete = async (userUid) => {
    axios.delete(`${url}`+ `user` + `/` + `${userUid}`)
}



// ************************************ 게시판 기능 ************************************
// 추천 캠핑장 (메인화면 켐핑장 추천 기능 구현)
export const viewCamping = async () => {
    return await axios.get(`${url}`+ `mainRecommend`)
};

// 게시판 목록 출력 (전체)
export const campingBoard = async () => {
    return await axios.get(`${url}`+ `board`)
}

// 게시판 목록 출력 (상세조회)
export const campingBoardMore = async (boardId) => {
    return await axios.get(`${url}`+`board`+ `/` + `${boardId}`)
}

// 게시글 삭제
export const articleDelete = async (boardId) => {
    axios.delete(`${url}`+`board` + `/` + `${boardId}`)
}

// ************************************ 댓글 기능 ************************************
// 댓글 조회
export const commentSearch = async (boardId) => {
    return await axios.get(`${url}`+`comment?boardId=` + `${boardId}`)
}

// 댓글 작성

// 댓글 수정

// 댓글 삭제
export const commentDelete = async (commentId) => {
    axios.delete(`${url}`+ `comment`+ `/` + `${commentId}`).then(() => location.reload())
}


// ************************************ 캠핑장 기능 ************************************
// 캠핑장 기능 (로그인 시)
export const receiveCamping_in = async (campingId, userUid) => {
    return await axios.get(`${url}`+`camping?campingId=${campingId}&userUid=${userUid}`)
}

// 캠핑장 기능 (로그아웃 시)
export const receiveCamping_out = async (campingId) => {
    return await axios.get(`${url}`+`camping?campingId=${campingId}`)
}

// 캠핑장 상세보기 내, 후기 목록
export const viewBoard = async (campingId) => {
    return await axios.get(`${url}`+`board/review?campingId=${campingId}`)
}

// 북마크
export const BookMark = async (campingId, userUid) => {
    // console.log(campingId);
    // console.log(userUid);
    return await axios.get(`${url}`+`bookmark?campingId=${campingId}&userUid=${userUid}`)
}

// 방문체크
export const VisitCheck = async (campingId, userUid) => {
    console.log(campingId);
    console.log(userUid);
    return await axios.get(`${url}`+`visit?campingId=${campingId}&userUid=${userUid}`)
}