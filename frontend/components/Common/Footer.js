import styles from '../../styles/Common/Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_contents}>
        <h2 className={styles.footer_title}>
          Copyrightⓒ 2022 Campus All rights reserved.
        </h2>
      </div>
    </footer>
  );
}

export default Footer;
