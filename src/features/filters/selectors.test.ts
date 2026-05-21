import { selectActiveFilterItems } from './selectors';

describe('selectActiveFilterItems', () => {
  const mockCategories = [
    {
      id: 'cat1',
      title: 'Программирование',
      color: '#ff0000',
      subcategories: [
        { id: 'sub1', title: 'JavaScript' },
        { id: 'sub2', title: 'Python' },
      ],
    },
    {
      id: 'cat2',
      title: 'Дизайн',
      color: '#00ff00',
      subcategories: [
        { id: 'sub3', title: 'UI/UX' },
        { id: 'sub4', title: 'Графический дизайн' },
      ],
    },
  ];

  const createState = (filtersOverride = {}) => ({
    filters: {
      filters: {
        skillExchangeIntent: 'all',
        skills: [],
        gender: 'any',
        city: [],
        searchQuery: '',
        ...filtersOverride,
      },
      hasActiveFilters: false,
    },
    categories: {
      categories: mockCategories,
    },
  });

  it('should return empty array when no filters are active', () => {
    const state = createState();
    const result = selectActiveFilterItems(state as any);
    expect(result).toEqual([]);
  });

  it('should include gender filter item when gender is not "any"', () => {
    const state = createState({ gender: 'male' });
    const result = selectActiveFilterItems(state as any);
    expect(result).toContainEqual({
      type: 'gender',
      value: 'male',
      label: 'Мужской',
    });
  });

  it('should include female gender with correct label', () => {
    const state = createState({ gender: 'female' });
    const result = selectActiveFilterItems(state as any);
    expect(result).toContainEqual({
      type: 'gender',
      value: 'female',
      label: 'Женский',
    });
  });

  it('should include skillExchangeIntent filter item when not "all"', () => {
    const state = createState({ skillExchangeIntent: 'canTeach' });
    const result = selectActiveFilterItems(state as any);
    expect(result).toContainEqual({
      type: 'skillExchangeIntent',
      value: 'canTeach',
      label: 'Может научить',
    });
  });

  it('should include wantsToLearn intent with correct label', () => {
    const state = createState({ skillExchangeIntent: 'wantsToLearn' });
    const result = selectActiveFilterItems(state as any);
    expect(result).toContainEqual({
      type: 'skillExchangeIntent',
      value: 'wantsToLearn',
      label: 'Хочет научиться',
    });
  });

  it('should include city filter items', () => {
    const state = createState({ city: ['Москва', 'Казань'] });
    const result = selectActiveFilterItems(state as any);
    expect(result).toContainEqual({
      type: 'city',
      value: 'Москва',
      label: 'Москва',
    });
    expect(result).toContainEqual({
      type: 'city',
      value: 'Казань',
      label: 'Казань',
    });
  });

  it('should include skill filter items with labels from categories', () => {
    const state = createState({ skills: ['sub1', 'sub3'] });
    const result = selectActiveFilterItems(state as any);
    expect(result).toContainEqual({
      type: 'skill',
      value: 'sub1',
      label: 'JavaScript',
    });
    expect(result).toContainEqual({
      type: 'skill',
      value: 'sub3',
      label: 'UI/UX',
    });
  });

  it('should use skill id as label if not found in categories', () => {
    const state = createState({ skills: ['unknown-skill'] });
    const result = selectActiveFilterItems(state as any);
    expect(result).toContainEqual({
      type: 'skill',
      value: 'unknown-skill',
      label: 'unknown-skill',
    });
  });

  it('should combine multiple active filters', () => {
    const state = createState({
      gender: 'male',
      skillExchangeIntent: 'canTeach',
      city: ['Москва'],
      skills: ['sub2'],
    });
    const result = selectActiveFilterItems(state as any);
    expect(result).toHaveLength(4);
    expect(result).toContainEqual({
      type: 'gender',
      value: 'male',
      label: 'Мужской',
    });
    expect(result).toContainEqual({
      type: 'skillExchangeIntent',
      value: 'canTeach',
      label: 'Может научить',
    });
    expect(result).toContainEqual({
      type: 'city',
      value: 'Москва',
      label: 'Москва',
    });
    expect(result).toContainEqual({
      type: 'skill',
      value: 'sub2',
      label: 'Python',
    });
  });

  it('should return items in correct order: gender, intent, cities, skills', () => {
    const state = createState({
      gender: 'female',
      skillExchangeIntent: 'wantsToLearn',
      city: ['Казань'],
      skills: ['sub4'],
    });
    const result = selectActiveFilterItems(state as any);
    expect(result[0].type).toBe('gender');
    expect(result[1].type).toBe('skillExchangeIntent');
    expect(result[2].type).toBe('city');
    expect(result[3].type).toBe('skill');
  });
});
