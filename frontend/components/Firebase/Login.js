import { Button, Modal } from 'react-bootstrap';
import styles from '/styles/Firebase/Login.module.css';
import { signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { authService } from "./firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { sendUserUid } from "../../function/axios";

function Login(props) {

    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);

        // 토큰이 없다면 등록
        if (typeof window !== "undefined") {
            console.log(data.user);
            console.log(data.user.accessToken);
            // 만약 이전에 토큰이 있다면 토큰 새로 등록하기
            localStorage.setItem("name", data.user.displayName);
            localStorage.setItem("photoURL", data.user.photoURL);
            localStorage.setItem("token", data.user.accessToken);
            // user Uid DB 전송하기
            sendUserUid(data.user.uid);
            // console.log(data.user);
            // location.reload();
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered 
        >
            <Modal.Header closeButton>
                <Modal.Title className={styles.login_header} id="contained-modal-title-vcenter">
                    <div>
                        <h1 style={{fontWeight: "bold"}}>Login</h1>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.login_pic_div}>
                    <img className={styles.login_pic} src="/logo.png" />
                </div>
                <div className={styles.login_pic_div}>
                    {/* <img className={styles.login_kakao_pic} name="kakao" onClick={onSocialClick} src="/kakaologin.png" /> */}
                    <img className={styles.login_google_pic} name="google" onClick={onSocialClick}  src="/googlelogin.png" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Login;
