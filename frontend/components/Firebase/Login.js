import { Button, Modal } from 'react-bootstrap';
import styles from '/styles/Firebase/Login.module.css';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
} from "@firebase/auth";
import { authService, firebaseInstance, auth  } from "./firebase";
import { useState } from 'react';

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {
        target: { name, value },
        } = event;
        if (name === "email") {
        setEmail(value);
        } else if (name === "password") {
        setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
        let data;
        if (newAccount) {
            data = await authService.createUserWithEmailAndPassword(
            email,
            password
            );
        } else {
            data = await authService.signInWithEmailAndPassword(email, password);
        }
        console.log(data);
        } catch (error) {
        setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        }
        // else if (name === "github") {
        //     provider = new GithubAuthProvider();
        // }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
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
