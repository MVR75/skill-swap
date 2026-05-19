import {
  filtersSlice,
  changeSkillIntent,
  changeSkills,
  changeGender,
  changeCities,
  setSearchQuery,
  clearFilters,
  deleteFilter,
  selectSkillExchangeIntent,
  selectSkills,
  selectGender,
  selectCities,
  selectSearchQuery,
  selectAllFilters,
  selectHasActiveFilters,
} from './filtersSlice';

const reducer = filtersSlice.reducer;

const initialState = {
  filters: {
    skillExchangeIntent: 'all',
    skills: [] as string[],
    gender: 'any',
    city: [] as string[],
    searchQuery: '',
  },
  hasActiveFilters: false,
};

describe('filtersSlice reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('changeSkillIntent', () => {
    it('should change skillExchangeIntent', () => {
      const state = reducer(initialState, changeSkillIntent('canTeach'));
      expect(state.filters.skillExchangeIntent).toBe('canTeach');
    });

    it('should set hasActiveFilters to true when intent is not "all"', () => {
      const state = reducer(initialState, changeSkillIntent('wantsToLearn'));
      expect(state.hasActiveFilters).toBe(true);
    });

    it('should set hasActiveFilters to false when intent is reset to "all"', () => {
      const activeState = {
        ...initialState,
        filters: { ...initialState.filters, skillExchangeIntent: 'canTeach' },
        hasActiveFilters: true,
      };
      const state = reducer(activeState, changeSkillIntent('all'));
      expect(state.hasActiveFilters).toBe(false);
    });
  });

  describe('changeSkills', () => {
    it('should change skills array', () => {
      const skills = ['skill1', 'skill2'];
      const state = reducer(initialState, changeSkills(skills));
      expect(state.filters.skills).toEqual(skills);
    });

    it('should set hasActiveFilters to true when skills are not empty', () => {
      const state = reducer(initialState, changeSkills(['skill1']));
      expect(state.hasActiveFilters).toBe(true);
    });

    it('should set hasActiveFilters to false when skills are cleared', () => {
      const activeState = {
        ...initialState,
        filters: { ...initialState.filters, skills: ['skill1'] },
        hasActiveFilters: true,
      };
      const state = reducer(activeState, changeSkills([]));
      expect(state.hasActiveFilters).toBe(false);
    });
  });

  describe('changeGender', () => {
    it('should change gender', () => {
      const state = reducer(initialState, changeGender('male'));
      expect(state.filters.gender).toBe('male');
    });

    it('should set hasActiveFilters to true when gender is not "any"', () => {
      const state = reducer(initialState, changeGender('female'));
      expect(state.hasActiveFilters).toBe(true);
    });

    it('should set hasActiveFilters to false when gender is reset to "any"', () => {
      const activeState = {
        ...initialState,
        filters: { ...initialState.filters, gender: 'male' },
        hasActiveFilters: true,
      };
      const state = reducer(activeState, changeGender('any'));
      expect(state.hasActiveFilters).toBe(false);
    });
  });

  describe('changeCities', () => {
    it('should change city array', () => {
      const cities = ['Москва', 'Санкт-Петербург'];
      const state = reducer(initialState, changeCities(cities));
      expect(state.filters.city).toEqual(cities);
    });

    it('should set hasActiveFilters to true when cities are not empty', () => {
      const state = reducer(initialState, changeCities(['Москва']));
      expect(state.hasActiveFilters).toBe(true);
    });

    it('should set hasActiveFilters to false when cities are cleared', () => {
      const activeState = {
        ...initialState,
        filters: { ...initialState.filters, city: ['Москва'] },
        hasActiveFilters: true,
      };
      const state = reducer(activeState, changeCities([]));
      expect(state.hasActiveFilters).toBe(false);
    });
  });

  describe('setSearchQuery', () => {
    it('should set search query', () => {
      const state = reducer(initialState, setSearchQuery('react'));
      expect(state.filters.searchQuery).toBe('react');
    });

    it('should set hasActiveFilters to true when query is not empty', () => {
      const state = reducer(initialState, setSearchQuery('test'));
      expect(state.hasActiveFilters).toBe(true);
    });

    it('should set hasActiveFilters to false when query is cleared', () => {
      const activeState = {
        ...initialState,
        filters: { ...initialState.filters, searchQuery: 'test' },
        hasActiveFilters: true,
      };
      const state = reducer(activeState, setSearchQuery(''));
      expect(state.hasActiveFilters).toBe(false);
    });
  });

  describe('clearFilters', () => {
    it('should reset all filters to initial state', () => {
      const activeState = {
        filters: {
          skillExchangeIntent: 'canTeach',
          skills: ['skill1', 'skill2'],
          gender: 'male',
          city: ['Москва'],
          searchQuery: 'react',
        },
        hasActiveFilters: true,
      };
      const state = reducer(activeState, clearFilters());
      expect(state).toEqual(initialState);
    });

    it('should set hasActiveFilters to false', () => {
      const activeState = {
        filters: {
          skillExchangeIntent: 'canTeach',
          skills: ['skill1'],
          gender: 'female',
          city: ['Казань'],
          searchQuery: 'js',
        },
        hasActiveFilters: true,
      };
      const state = reducer(activeState, clearFilters());
      expect(state.hasActiveFilters).toBe(false);
    });
  });

  describe('deleteFilter', () => {
    it('should reset gender to "any"', () => {
      const activeState = {
        ...initialState,
        filters: { ...initialState.filters, gender: 'male' },
        hasActiveFilters: true,
      };
      const state = reducer(
        activeState,
        deleteFilter({ type: 'gender', value: 'male' })
      );
      expect(state.filters.gender).toBe('any');
    });

    it('should reset skillExchangeIntent to "all"', () => {
      const activeState = {
        ...initialState,
        filters: { ...initialState.filters, skillExchangeIntent: 'canTeach' },
        hasActiveFilters: true,
      };
      const state = reducer(
        activeState,
        deleteFilter({ type: 'skillExchangeIntent', value: 'canTeach' })
      );
      expect(state.filters.skillExchangeIntent).toBe('all');
    });

    it('should remove a specific city from the array', () => {
      const activeState = {
        ...initialState,
        filters: {
          ...initialState.filters,
          city: ['Москва', 'Казань', 'Новосибирск'],
        },
        hasActiveFilters: true,
      };
      const state = reducer(
        activeState,
        deleteFilter({ type: 'city', value: 'Казань' })
      );
      expect(state.filters.city).toEqual(['Москва', 'Новосибирск']);
    });

    it('should remove a specific skill from the array', () => {
      const activeState = {
        ...initialState,
        filters: {
          ...initialState.filters,
          skills: ['skill1', 'skill2', 'skill3'],
        },
        hasActiveFilters: true,
      };
      const state = reducer(
        activeState,
        deleteFilter({ type: 'skill', value: 'skill2' })
      );
      expect(state.filters.skills).toEqual(['skill1', 'skill3']);
    });

    it('should clear search query', () => {
      const activeState = {
        ...initialState,
        filters: { ...initialState.filters, searchQuery: 'react' },
        hasActiveFilters: true,
      };
      const state = reducer(
        activeState,
        deleteFilter({ type: 'search', value: 'react' })
      );
      expect(state.filters.searchQuery).toBe('');
    });

    it('should update hasActiveFilters after deleting the last active filter', () => {
      const activeState = {
        ...initialState,
        filters: { ...initialState.filters, gender: 'male' },
        hasActiveFilters: true,
      };
      const state = reducer(
        activeState,
        deleteFilter({ type: 'gender', value: 'male' })
      );
      expect(state.hasActiveFilters).toBe(false);
    });

    it('should keep hasActiveFilters true if other filters remain', () => {
      const activeState = {
        ...initialState,
        filters: {
          ...initialState.filters,
          gender: 'male',
          skills: ['skill1'],
        },
        hasActiveFilters: true,
      };
      const state = reducer(
        activeState,
        deleteFilter({ type: 'gender', value: 'male' })
      );
      expect(state.hasActiveFilters).toBe(true);
    });
  });
});

describe('filtersSlice selectors', () => {
  const stateWithFilters = {
    filters: {
      filters: {
        skillExchangeIntent: 'canTeach',
        skills: ['skill1', 'skill2'],
        gender: 'female',
        city: ['Москва', 'Казань'],
        searchQuery: 'react',
      },
      hasActiveFilters: true,
    },
  };

  it('selectSkillExchangeIntent should return skillExchangeIntent', () => {
    expect(selectSkillExchangeIntent(stateWithFilters as any)).toBe('canTeach');
  });

  it('selectSkills should return skills array', () => {
    expect(selectSkills(stateWithFilters as any)).toEqual(['skill1', 'skill2']);
  });

  it('selectGender should return gender', () => {
    expect(selectGender(stateWithFilters as any)).toBe('female');
  });

  it('selectCities should return city array', () => {
    expect(selectCities(stateWithFilters as any)).toEqual(['Москва', 'Казань']);
  });

  it('selectSearchQuery should return search query', () => {
    expect(selectSearchQuery(stateWithFilters as any)).toBe('react');
  });

  it('selectAllFilters should return the entire filters object', () => {
    expect(selectAllFilters(stateWithFilters as any)).toEqual({
      skillExchangeIntent: 'canTeach',
      skills: ['skill1', 'skill2'],
      gender: 'female',
      city: ['Москва', 'Казань'],
      searchQuery: 'react',
    });
  });

  it('selectHasActiveFilters should return hasActiveFilters flag', () => {
    expect(selectHasActiveFilters(stateWithFilters as any)).toBe(true);
  });

  it('selectHasActiveFilters should return false for initial state', () => {
    const defaultState = {
      filters: {
        filters: {
          skillExchangeIntent: 'all',
          skills: [],
          gender: 'any',
          city: [],
          searchQuery: '',
        },
        hasActiveFilters: false,
      },
    };
    expect(selectHasActiveFilters(defaultState as any)).toBe(false);
  });
});
