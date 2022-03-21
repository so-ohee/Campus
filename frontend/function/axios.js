import axios from "axios";

const url = "http://localhost:8080/";

export const sendUserUid = async (userUid, displayName, photoURL) => {
    const url2 = "http://localhost:8080/user";
    // await axios.get(`${ url }`+ `/` + `user` +`/`+ `${userUid}`)
    // await axios
    //     .post(url2, {
    //         params: { name: displayName, profile: photoURL, userUid: userUid }
    //     })
    //     .then((res) => console.log("성공"));
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
            console.log(res);
        }
    );
};

export const viewCamping = async () => {
    return await axios.get(`${url}`+ `/` + `mainRecommend`)
};