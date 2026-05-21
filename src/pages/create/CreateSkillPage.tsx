import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../app/store';
import { getCategories } from '../../features/categories/categoriesSlice';
import { addCreatedSkill, addUserSkillCard } from '../../features/skills/skillsSlice';
import { selectUserInfo } from '../../features/Users/userSlice';
import type { TSkillCard, TSkillCategory } from '../../entities/types';
import { SkillOfferForm } from '../../features/skillOffer/SkillOfferForm';
import type { SkillOfferFormData } from '../../features/skillOffer/model/schema';
import { PreviewModal } from '../register/components/PreviewModal/PreviewModal';
import { NotificationModal } from '../../shared/ui/NotificationModal/NotificationModal';
import styles from './CreateSkillPage.module.css';

const CreateSkillPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);
  const userInfo = useSelector(selectUserInfo);
  const [formData, setFormData] = useState<Partial<SkillOfferFormData>>({});
  const [previewPhotos, setPreviewPhotos] = useState<string[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

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

  const handleSubmit = (data: SkillOfferFormData) => {
    setFormData(data);
    setIsPreviewOpen(true);
  };

  const handlePreviewEdit = () => {
    setIsPreviewOpen(false);
  };

  const handlePreviewDone = () => {
    const skillId = crypto.randomUUID();
    const categoryId = formData.teachCategories?.[0];
    const category = categories.find((cat) => cat.id === categoryId);
    const subcategoryIds = formData.teachSubcategories ?? [];

    const newSkill = {
      id: skillId,
      title: formData.teachTitle ?? '',
      description: formData.teachAbout ?? '',
      category: categoryId ?? '',
      categoryTitle: category?.title ?? '',
      subcategory: subcategoryIds[0] ?? '',
    };
    dispatch(addCreatedSkill(newSkill));

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
      id: skillId,
      name: userInfo?.name ?? '',
      favorites: false,
      city: userInfo?.city ?? '',
      age: 0,
      birthDate: userInfo?.birthDate?.toString() ?? '',
      gender: userInfo?.gender ?? '',
      email: userInfo?.email ?? '',
      avatarUrl: userInfo?.src ?? '',
      shortAbout: userInfo?.about ?? '',
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

  const handleNotificationDone = () => {
    setIsNotificationOpen(false);
    navigate('/profile');
  };

  const previewCategoryId = formData.teachCategories?.[0];
  const previewSubcategoryIds = formData.teachSubcategories ?? [];
  const previewCategory = categories.find((cat) => cat.id === previewCategoryId);
  const categoryTitle = previewCategory?.title ?? '';
  const subcategoryTitle = previewCategory
    ? previewCategory.subcategories
        .filter((subcategory) => previewSubcategoryIds.includes(subcategory.id))
        .map((subcategory) => subcategory.title)
        .join(', ')
    : '';

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Создание предложения навыка</h1>
        <div className={styles.formCard}>
          <SkillOfferForm
            onSubmit={handleSubmit}
            initialData={formData}
            submitText="Создать"
          />
        </div>
      </div>
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
    </main>
  );
};

export default CreateSkillPage;
