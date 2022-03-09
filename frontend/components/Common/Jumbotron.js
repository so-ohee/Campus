import styles from '/styles/Common/Jumbotron.module.css';

function Jumbotron() {
  return (
    <>
      <img className={styles.jumbotron_pic} src='jumbotron.jpg' />
    </>
  );
}

export default Jumbotron;
