import { useEffect, useState } from 'react';
import { fetchCategories } from '../../../api/categoriesApi';
import type { TCategory } from '../../../entities/types';

import styles from './CategoriesModal.module.css';

type TCategoriesModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const categoryIcons: Record<string, string> = {
  business: `${import.meta.env.BASE_URL}icons/briefcase.svg`,
  creative: `${import.meta.env.BASE_URL}icons/palette.svg`,
  languages: `${import.meta.env.BASE_URL}icons/global.svg`,
  education: `${import.meta.env.BASE_URL}icons/book.svg`,
  home: `${import.meta.env.BASE_URL}icons/home.svg`,
  health: `${import.meta.env.BASE_URL}icons/lifestyle.svg`,
};

export function CategoriesModal({ isOpen, onClose }: TCategoriesModalProps) {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const loadCategories = async () => {
      try {
        setIsLoading(true);
        setErrorMessage('');
        const data = await fetchCategories();
        setCategories(data);
      } catch {
        setErrorMessage('Не удалось загрузить категории');
      } finally {
        setIsLoading(false);
      }
    };
    loadCategories();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        {isLoading && <p className={styles.message}>Загрузка категорий</p>}

        {errorMessage && <p className={styles.message}>{errorMessage}</p>}

        {!isLoading && !errorMessage && (
          <div className={styles.grid}>
            {categories.map((category) => (
              <section className={styles.category} key={category.id}>
                <div
                  className={styles.iconWrapper}
                  style={{ backgroundColor: category.color }}
                >
                  <img
                    className={styles.icon}
                    src={categoryIcons[category.id]}
                    alt=""
                    aria-hidden="true"
                  />
                </div>

                <div className={styles.categoryContent}>
                  <h3 className={styles.categoryTitle}>{category.title}</h3>

                  <ul className={styles.subcategories}>
                    {category.subcategories.map((subcategory) => (
                      <li className={styles.subcategory} key={subcategory.id}>
                        <button
                          className={styles.subcategoryButton}
                          type="button"
                        >
                          {subcategory.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
