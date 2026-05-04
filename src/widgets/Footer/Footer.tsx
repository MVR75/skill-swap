import styles from './Footer.module.css';

export const Footer = () => (
  <footer className={styles.footer}>
    <div>
      <img src='../../../public/logo.svg' width={159} height={40}/>
    </div>
    <nav className={styles.footer__nav}>
      <ul className={styles.footer__list}>
        <li><a href="#" className={styles.footer__listLink}>О проекте</a></li>
        <li><a href="#" className={styles.footer__listLink}>Контакты</a></li>
        <li><a href="#" className={styles.footer__listLink}>Политика конфиденциальности</a></li>
        <li><a href="#" className={styles.footer__listLink}>Все навыки</a></li>
        <li><a href="#" className={styles.footer__listLink}>Блог</a></li>
        <li><a href="#" className={styles.footer__listLink}>Пользовательское соглашение</a></li>
      </ul>
    </nav>
    <small className={styles.footer__watermark}>
      SkillSwap - <time dateTime='2025'>2025</time>
    </small>
  </footer>
);
