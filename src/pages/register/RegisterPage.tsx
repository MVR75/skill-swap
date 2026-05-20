import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../app/store';
import { getCategories } from '../../features/categories/categoriesSlice';
import { addUserSkillCard } from '../../features/skills/skillsSlice';
import type { TSkillCard, TSkillCategory } from '../../entities/types';
import { Step1 } from './steps/Step1/Step1';
import { Step2 } from './steps/Step2/Step2';
import { Step3 } from './steps/Step3/Step3';
import { PreviewModal } from './components/PreviewModal/PreviewModal';
import { NotificationModal } from '../../shared/ui/NotificationModal/NotificationModal';
import type { Step1Data } from './steps/Step1/schema';
import type { Step2Data, Step3Data, RegisterFormData } from './types';
import styles from './RegisterPage.module.css';

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

export function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [formData, setFormData] = useState<Partial<RegisterFormData>>({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [previewPhotos, setPreviewPhotos] = useState<string[]>([]);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!isPreviewOpen || !formData.teachImages?.length) {
      return;
    }
    const urls = formData.teachImages.map((file) => URL.createObjectURL(file));
    setPreviewPhotos(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      setPreviewPhotos([]);
    };
  }, [isPreviewOpen, formData.teachImages]);

  const handleStep1Submit = (data: Step1Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStep2Submit = (data: Step2Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handleStep3Submit = (data: Step3Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setIsPreviewOpen(true);
  };

  const handlePreviewEdit = () => {
    setIsPreviewOpen(false);
  };

  const handlePreviewDone = () => {
    const categoryId = formData.teachCategories?.[0];
    const category = categories.find((cat) => cat.id === categoryId);
    const subcategoryIds = formData.teachSubcategories ?? [];

    const canTeachSkills: TSkillCategory[] = subcategoryIds.map((subId) => {
      const sub = category?.subcategories.find((s) => s.id === subId);
      return {
        subcategory: subId,
        title: sub?.title ?? '',
        category: categoryId ?? '',
        categoryTitle: category?.title ?? '',
        color: category?.color ?? '',
      };
    });

    const skillCard: TSkillCard = {
      id: crypto.randomUUID(),
      name: formData.name ?? '',
      favorites: false,
      city: formData.city ?? '',
      age: 0,
      birthDate: formData.birthDate?.toISOString() ?? '',
      gender: formData.gender ?? '',
      email: formData.email ?? '',
      avatarUrl: '',
      shortAbout: '',
      teachTitle: formData.teachTitle ?? '',
      teachAbout: formData.teachAbout ?? '',
      teachPhotos: previewPhotos,
      skills: {
        canTeach: canTeachSkills,
        wantsToLearn: [],
      },
    };
    dispatch(addUserSkillCard(skillCard));

    setIsPreviewOpen(false);
    setIsNotificationOpen(true);
  };

  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/login');
  };

  const handleNotificationDone = () => {
    setIsNotificationOpen(false);
    handleClose();
  };

  const handleBack = () => {
    if (currentStep === 2) setCurrentStep(1);
    if (currentStep === 3) setCurrentStep(2);
  };

  const categoryId = formData.teachCategories?.[0];
  const subcategoryIds = formData.teachSubcategories ?? [];

  const category = categories.find((cat) => cat.id === categoryId);
  const categoryTitle = category?.title ?? '';
  const subcategoryTitle = category
    ? category.subcategories
        .filter((sub) => subcategoryIds.includes(sub.id))
        .map((sub) => sub.title)
        .join(', ')
    : '';

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
            onClick={handleClose}
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
            <Step3
              onSubmit={handleStep3Submit}
              onBack={handleBack}
              initialData={formData}
            />
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

      <PreviewModal
        isOpen={isPreviewOpen}
        data={{
          teachTitle: formData.teachTitle ?? '',
          teachAbout: formData.teachAbout ?? '',
          teachPhotos: previewPhotos,
          categoryTitle,
          subcategoryTitle,
        }}
        onEdit={handlePreviewEdit}
        onDone={handlePreviewDone}
      />

      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={handleNotificationDone}
        title="Ваше предложение создано"
        message="Теперь вы можете предложить обмен"
        icon="success"
        buttonText="Готово"
      />
    </div>
  );
}
