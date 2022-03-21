import axios from "axios";

const url = "http://localhost:8080/";

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

export const viewCamping = async () => {
    return await axios.get(`${url}`+ `/` + `mainRecommend`)
};