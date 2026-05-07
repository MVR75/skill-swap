import { Step1 } from './steps/Step1/Step1';
import type { Step1Data } from './steps/Step1/schema';
import styles from './RegisterPage.module.css';

type RegisterPageProps = {
  onClose: () => void;
};

const TOTAL_STEPS = 3;
const CURRENT_STEP = 1;

export function RegisterPage({ onClose }: RegisterPageProps) {
  const handleStep1Submit = (data: Step1Data) => {
    // переход на Step2
    console.log('Step 1 data:', data);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <a href="/" className={styles.logoLink} aria-label="На главную">
            <img src="/logo.svg" alt="SkillSwap" className={styles.logo} />
          </a>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Закрыть"
          >
            Закрыть
            <img
              src="/icons/cross.svg"
              alt=""
              className={styles.closeIcon}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className={styles.progress}>
          <span className={styles.progressLabel}>
            Шаг {CURRENT_STEP} из {TOTAL_STEPS}
          </span>
          <div className={styles.progressBar} aria-hidden="true">
            {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
              <span
                key={index}
                className={`${styles.progressSegment} ${
                  index < CURRENT_STEP ? styles.progressSegmentActive : ''
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.formCard}>
          <Step1 onSubmit={handleStep1Submit} />
        </section>

        <aside className={styles.sideCard}>
          <img
            src="/icons/light-bulb.svg"
            alt=""
            className={styles.illustration}
            aria-hidden="true"
          />
          <h2 className={styles.welcomeTitle}>Добро пожаловать в SkillSwap!</h2>
          <p className={styles.welcomeText}>
            Присоединяйтесь к SkillSwap и обменивайтесь
            <br />
            знаниями и навыками с другими людьми
          </p>
        </aside>
      </main>
    </div>
  );
}
