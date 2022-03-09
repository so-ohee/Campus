import { Button, Modal } from 'react-bootstrap';
import styles from '/styles/Firebase/Login.module.css';

function Login(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.login_pic_div}>
                    <img className={styles.login_pic} src="/logo.png" />
                </div>
                <div>
                    
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Login;
