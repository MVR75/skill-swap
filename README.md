# SkillSwap — платформа обмена навыками

Одностраничное приложение (SPA), в котором пользователи публикуют навыки двух типов: "Учу" (готов делиться) и "Учусь" (хочу научиться). Сервис позволяет находить взаимно подходящие пары, отправлять заявки на обмен и вести список текущих и завершённых сессий.

## Стек технологий

| Технология | Назначение |
|------------|------------|
| React 18 | Библиотека для интерфейсов |
| TypeScript | Типизация |
| Redux Toolkit | Управление состоянием |
| React Router v6 | Маршрутизация |
| CSS Modules | Стилизация компонентов |
| Jest + React Testing Library | Тестирование |
| ESLint + Prettier + Stylelint | Линтеры и форматтеры |
| Vite | Сборка |
| @mdi/react | Иконки |

## Как начать работу

### 1. Клонировать репозиторий

    git clone https://github.com/PM-YandexPracticum/SkillSwap_48_3
    cd SkillSwap_48_3

### 2. Установить зависимости

    npm install --legacy-peer-deps

### 3. Запустить проект

    npm run dev

Проект будет доступен по адресу http://localhost:5173

## Команды

| Команда | Действие |
|---------|----------|
| `npm run dev` | Запустить дев-сервер |
| `npm run build` | Собрать проект |
| `npm run preview` | Посмотреть сборку локально |
| `npm run lint` | Проверить код линтерами |
| `npm run lint:fix` | Исправить ошибки линтеров |
| `npm run format` | Отформатировать код |
| `npm run test` | Запустить тесты |
| `npm run test:coverage` | Тесты с покрытием |

## Моковые данные

    export const fetchSkills = async (): Promise<Skill[]> => {
      const response = await fetch('/db/skills.json');
      if (!response.ok) throw new Error('Ошибка загрузки');
      return response.json();
    };

## Соглашения по коду

### Компоненты

- Только функциональные компоненты
- Пропсы описываются через интерфейс ComponentNameProps
- Компонент и стили лежат в одной папке

  import styles from './Component.module.css';

  interface ComponentProps {
  title: string;
  onClick?: () => void;
  }

  export const Component = ({ title, onClick }: ComponentProps) => {
  return <div className={styles.container}>{title}</div>;
  };

### Стили

- CSS Modules
- Файл: ComponentName.module.css
- Классы в camelCase

### Типы

- Общие типы лежат в shared/types/
- Типы компонента — внутри его папки

  export interface Skill {
  id: string;
  title: string;
  description: string;
  type: 'teach' | 'learn';
  category: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  }

### Иконки

    import Icon from '@mdi/react';
    import { mdiMagnify } from '@mdi/js';

    <Icon path={mdiMagnify} size={1} color="#666" />

## Ветки и коммиты

- Ветки: feature/название-задачи
- Коммиты: Conventional Commits

  feat: добавить компонент SkillCard
  fix: исправить фильтрацию по категории
  refactor: вынести типы в отдельный файл

## Pull Requests

- Название PR совпадает с названием ветки
- В описании: что сделано и как проверить
- Минимум 1 апрув перед merge

## Макет

https://www.figma.com/design/bKwOakHJI7Z2mh2zVCBphP/SkillSwap---Для-разработчиков?node-id=0-1&p=f

## Критерии приёмки проекта

- Все задачи MVP закрыты
- npm run build, npm run lint, npm run test без ошибок
- Пользовательский сценарий выполняется полностью
- Lighthouse: Performance ≥ 80, Accessibility ≥ 90
- Покрытие тестами ≥ 70%
