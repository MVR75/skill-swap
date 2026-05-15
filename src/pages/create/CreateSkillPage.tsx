import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../app/store';
import { getCategories } from '../../features/categories/categoriesSlice';
import { addCreatedSkill } from '../../features/skills/skillsSlice';
import { SkillOfferForm } from '../../features/skillOffer/SkillOfferForm';
import type { SkillOfferFormData } from '../../features/skillOffer/model/schema';
import { PreviewModal } from '../register/components/PreviewModal/PreviewModal';
import { NotificationModal } from '../../shared/ui/NotificationModal/NotificationModal';
import styles from './CreateSkillPage.module.css';

const CreateSkillPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);
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
    const newSkill = {
      id: crypto.randomUUID(),
      teachTitle: formData.teachTitle ?? '',
      teachAbout: formData.teachAbout ?? '',
      teachCategories: formData.teachCategories ?? [],
      teachSubcategories: formData.teachSubcategories ?? [],
      teachPhotos: previewPhotos,
      createdAt: new Date().toISOString(),
    };
    dispatch(addCreatedSkill(newSkill));
    setIsPreviewOpen(false);
    setIsNotificationOpen(true);
  };

  const handleNotificationDone = () => {
    setIsNotificationOpen(false);
    navigate('/profile');
  };

  const categoryId = formData.teachCategories?.[0];
  const subcategoryIds = formData.teachSubcategories ?? [];
  const category = categories.find((cat) => cat.id === categoryId);
  const categoryTitle = category?.title ?? '';
  const subcategoryTitle = category
    ? category.subcategories
        .filter((subcategory) => subcategoryIds.includes(subcategory.id))
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
