import { useState, useEffect } from 'react';
import { useDispatch } from '../../app/store';
import { getCategories } from '../../features/categories/categoriesSlice';
import { Step1 } from './steps/Step1/Step1';
import type { Step1Data } from './steps/Step1/schema';
import type { Step2Data, Step3Data, RegisterFormData } from './types';
import styles from './RegisterPage.module.css';
import { Step2 } from './steps/Step2/Step2';

type RegisterPageProps = {
  onClose: () => void;
};

const TOTAL_STEPS = 3;

type StepNumber = 1 | 2 | 3;

type StepContent = {
  illustration: string;
  title: string;
  text: string;
};

const STEP_CONTENT: Record<StepNumber, StepContent> = {
  1: {
    illustration: '/icons/light-bulb.svg',
    title: 'Добро пожаловать в SkillSwap!',
    text: 'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми',
  },
  2: {
    illustration: '/icons/user-info.svg',
    title: 'Расскажите немного о себе',
    text: 'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена',
  },
  3: {
    illustration: '/icons/school-board.svg',
    title: 'Укажите, чем вы готовы поделиться',
    text: 'Так другие люди смогут увидеть ваши предложения и предложить вам обмен!',
  },
};

export function RegisterPage({ onClose }: RegisterPageProps) {
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [formData, setFormData] = useState<Partial<RegisterFormData>>({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleStep1Submit = (data: Step1Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStep2Submit = (data: Step2Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handleStep3Submit = (data: Step3Data) => {
    const finalData = { ...formData, ...data };
    console.log('Регистрация завершена');
    void finalData;
  };

  const handleBack = () => {
    if (currentStep === 2) setCurrentStep(1);
    if (currentStep === 3) setCurrentStep(2);
  };

  const content = STEP_CONTENT[currentStep];

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
            Шаг {currentStep} из {TOTAL_STEPS}
          </span>
          <div className={styles.progressBar} aria-hidden="true">
            {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
              <span
                key={index}
                className={`${styles.progressSegment} ${
                  index < currentStep ? styles.progressSegmentActive : ''
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.formCard}>
          {currentStep === 1 && <Step1 onSubmit={handleStep1Submit} />}
          {currentStep === 2 && (
            <Step2
              onSubmit={handleStep2Submit}
              onBack={handleBack}
              initialData={formData}
            />
          )}
          {currentStep === 3 && (
            <div>
              <p>Step3 (заглушка)</p>
              <button type="button" onClick={handleBack}>
                Назад
              </button>
              <button
                type="button"
                onClick={() => handleStep3Submit({} as Step3Data)}
              >
                Завершить (тест)
              </button>
            </div>
          )}
        </section>

        <aside className={styles.sideCard}>
          <img
            src={content.illustration}
            alt=""
            className={styles.illustration}
            aria-hidden="true"
          />
          <h2 className={styles.welcomeTitle}>{content.title}</h2>
          <p className={styles.welcomeText}>{content.text}</p>
        </aside>
      </main>
    </div>
  );
}
