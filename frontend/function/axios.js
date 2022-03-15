import axios from "axios";

const url = "http://localhost:8080/";

export const sendUserUid = async (userUid) => {
    await axios.get(`${ url }`+ `/` + `user` +`/`+ `${userUid}`)
};