import { Button, Modal } from 'react-bootstrap';
import styles from '/styles/Firebase/Login.module.css';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
} from "@firebase/auth";
import { authService, firebaseInstance  } from "firebase";

function Login(props) {
    const onSocialClick = async (event) => {
        const name = event.target.name;
        let provider;
        if (name === "google") {
        provider = new GoogleAuthProvider();
        } else if (name === "github") {
        provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
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
                    <img className={styles.login_kakao_pic} name="kakao" onClick={onSocialClick} src="/kakaologin.png" />
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
