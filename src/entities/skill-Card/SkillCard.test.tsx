import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import SkillCard from './SkillCard';
import { userSlice } from '../../features/Users/userSlice';
import type { TSkillCategory } from '../types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const createMockStore = (favorites: string[] = []) =>
  configureStore({
    reducer: {
      user: userSlice.reducer,
    },
    preloadedState: {
      user: {
        userInfo: null,
        favorites,
        notifications: [],
        loading: false,
        error: null,
        isAuthenticated: false,
      },
    },
  });

const mockSkills: {
  canTeach: TSkillCategory[];
  wantsToLearn: TSkillCategory[];
} = {
  canTeach: [
    {
      subcategory: 'music',
      title: 'Музыка и звук',
      category: 'creative',
      categoryTitle: 'Творчество и искусство',
      color: '#f7e7f2',
    },
  ],
  wantsToLearn: [
    {
      subcategory: 'time-management',
      title: 'Тайм-менеджмент',
      category: 'business',
      categoryTitle: 'Бизнес и карьера',
      color: '#eee7f7',
    },
    {
      subcategory: 'yoga-meditation',
      title: 'Йога и медитация',
      category: 'health',
      categoryTitle: 'Здоровье и лайфстайл',
      color: '#e8ecf7',
    },
  ],
};

const defaultProps = {
  id: '1',
  name: 'Иван',
  city: 'Санкт-Петербург',
  age: 34,
  avatarUrl: 'https://taxpert.ru/neuroavatar/preview/a3a041e717ef0599.jpg',
  skills: mockSkills,
};

function renderSkillCard(
  props = defaultProps,
  favorites: string[] = []
) {
  const store = createMockStore(favorites);
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <SkillCard {...props} />
        </MemoryRouter>
      </Provider>
    ),
  };
}

describe('SkillCard', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe('Кнопка лайка', () => {
    it('должна отображаться в неактивном состоянии по умолчанию', () => {
      renderSkillCard();
      const likeButton = screen.getByTitle('Like');
      expect(likeButton).toBeInTheDocument();
    });

    it('должна изменять состояние при клике', () => {
      const { store } = renderSkillCard();
      const likeButton = screen.getByTitle('Like').closest('button')!;

      fireEvent.click(likeButton);

      const state = store.getState();
      expect(state.user.favorites).toContain('1');
    });

    it('должна убирать из избранного при повторном клике', () => {
      const { store } = renderSkillCard(defaultProps, ['1']);
      const likeButton = screen.getByTitle('Like').closest('button')!;

      fireEvent.click(likeButton);

      const state = store.getState();
      expect(state.user.favorites).not.toContain('1');
    });
  });

  describe('Данные пользователя', () => {
    it('должна отображать имя пользователя', () => {
      renderSkillCard();
      expect(screen.getByText('Иван')).toBeInTheDocument();
    });

    it('должна отображать город', () => {
      renderSkillCard();
      expect(screen.getByText(/Санкт-Петербург/)).toBeInTheDocument();
    });

    it('должна отображать возраст со склонением "года" (34 года)', () => {
      renderSkillCard();
      expect(screen.getByText(/34 года/)).toBeInTheDocument();
    });

    it('должна отображать склонение "год" (21 год)', () => {
      renderSkillCard({ ...defaultProps, age: 21 });
      expect(screen.getByText(/21 год/)).toBeInTheDocument();
    });

    it('должна отображать склонение "лет" (15 лет)', () => {
      renderSkillCard({ ...defaultProps, age: 15 });
      expect(screen.getByText(/15 лет/)).toBeInTheDocument();
    });

    it('должна отображать склонение "лет" для 11-14 (11 лет)', () => {
      renderSkillCard({ ...defaultProps, age: 11 });
      expect(screen.getByText(/11 лет/)).toBeInTheDocument();
    });

    it('должна отображать склонение "лет" (40 лет)', () => {
      renderSkillCard({ ...defaultProps, age: 40 });
      expect(screen.getByText(/40 лет/)).toBeInTheDocument();
    });

    it('должна отображать аватар если avatarUrl задан', () => {
      renderSkillCard();
      const avatar = screen.getByAltText('Иван');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute(
        'src',
        'https://taxpert.ru/neuroavatar/preview/a3a041e717ef0599.jpg'
      );
    });

    it('должна отображать цветную заглушку если avatarUrl пустой', () => {
      renderSkillCard({ ...defaultProps, avatarUrl: '' });
      expect(screen.queryByAltText('Иван')).not.toBeInTheDocument();
      // Проверяем наличие SVG-иконки заглушки (mdiAccount)
      const svgIcon = document.querySelector('svg');
      expect(svgIcon).toBeInTheDocument();
    });
  });

  describe('Навыки', () => {
    it('должна рендерить заголовок "Может научить:"', () => {
      renderSkillCard();
      expect(screen.getByText('Может научить:')).toBeInTheDocument();
    });

    it('должна рендерить заголовок "Хочет научиться:"', () => {
      renderSkillCard();
      expect(screen.getByText('Хочет научиться:')).toBeInTheDocument();
    });

    it('должна рендерить список навыков "Может научить"', () => {
      renderSkillCard();
      expect(screen.getByText('Творчество и искусство')).toBeInTheDocument();
    });

    it('должна применять цвет тега для навыков', () => {
      renderSkillCard();
      const skillTag = screen.getByText('Творчество и искусство');
      const style = skillTag.getAttribute('style');
      expect(style).toContain('#f7e7f2');
    });

    it('должна рендерить первый навык из "Хочет научиться" и сворачивать остальные в +число', () => {
      renderSkillCard();
      expect(screen.getByText('Бизнес и карьера')).toBeInTheDocument();
      expect(screen.getByText('+1')).toBeInTheDocument();
    });

    it('не должна показывать +число если навык только один', () => {
      const singleWantsToLearn = {
        ...defaultProps,
        skills: {
          canTeach: mockSkills.canTeach,
          wantsToLearn: [mockSkills.wantsToLearn[0]],
        },
      };
      renderSkillCard(singleWantsToLearn);
      expect(screen.getByText('Бизнес и карьера')).toBeInTheDocument();
      expect(screen.queryByText(/\+\d/)).not.toBeInTheDocument();
    });

    it('должна показывать +2 если навыков 3', () => {
      const threeSkills = {
        ...defaultProps,
        skills: {
          canTeach: mockSkills.canTeach,
          wantsToLearn: [
            ...mockSkills.wantsToLearn,
            {
              subcategory: 'cooking',
              title: 'Кулинария',
              category: 'home',
              categoryTitle: 'Дом и быт',
              color: '#f7ebe5',
            },
          ],
        },
      };
      renderSkillCard(threeSkills);
      expect(screen.getByText('+2')).toBeInTheDocument();
    });
  });

  describe('Кнопка "Подробнее"', () => {
    it('должна отображаться на карточке', () => {
      renderSkillCard();
      expect(screen.getByText('Подробнее')).toBeInTheDocument();
    });

    it('должна переходить на страницу /skill/:id при клике', () => {
      renderSkillCard();
      const button = screen.getByText('Подробнее');
      fireEvent.click(button);
      expect(mockNavigate).toHaveBeenCalledWith('/skill/1');
    });

    it('должна переходить на правильный id', () => {
      renderSkillCard({ ...defaultProps, id: '42' });
      const button = screen.getByText('Подробнее');
      fireEvent.click(button);
      expect(mockNavigate).toHaveBeenCalledWith('/skill/42');
    });
  });
});
