import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { TSkillCard, TCreatedSkill, TAsyncStatus } from '../../entities/types';
import { fetchSkills } from '../../api/skillsApi';
import {
  getCreatedSkillsFromStorage,
  saveCreatedSkillsToStorage,
} from '../../pages/shared/lib/createdSkillsStorage';

export const getSkills = createAsyncThunk<
  TSkillCard[],
  void,
  { rejectValue: string }
>('skills/get', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchSkills();
    return response.users;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Не удалось загрузить данные';
    return rejectWithValue(message);
  }
});

type TSkillsState = {
  cards: TSkillCard[];
  createdSkills: TCreatedSkill[];
  status: TAsyncStatus;
  error: string | null;
};

const initialState: TSkillsState = {
  cards: [],
  createdSkills: getCreatedSkillsFromStorage(),
  status: 'idle',
  error: null
};

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    addCreatedSkill: (state, action: PayloadAction<TCreatedSkill>) => {
      state.createdSkills.push(action.payload);
      saveCreatedSkillsToStorage(state.createdSkills);
    },

    removeCreatedSkill: (state, action: PayloadAction<string>) => {
      state.createdSkills = state.createdSkills.filter(
        (skill) => skill.id !== action.payload
      );

      saveCreatedSkillsToStorage(state.createdSkills);
    },
    
    addUserSkillCard: (state, action: PayloadAction<TSkillCard>) => {
      const exists = state.cards.some(card => card.id === action.payload.id);
      if (!exists) {
        state.cards.push(action.payload);
      }
    },
    
    updateUserSkillCard: (state, action: PayloadAction<TSkillCard>) => {
      const index = state.cards.findIndex(card => card.id === action.payload.id);
      if (index !== -1) {
        state.cards[index] = action.payload;
      }
    },
    
    removeUserSkillCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSkills.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cards = action.payload;
      })
      .addCase(getSkills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message ?? 'Не удалось загрузить данные';
      });
  },
  selectors: {
    selectAllSkillCards: (state) => state.cards,
    selectCreatedSkills: (state) => state.createdSkills,
    
    selectUserSkillCards: (state) => state.cards.filter(card => 
      card.email === localStorage.getItem('userEmail') || 
      (card as any).isUserCreated === true
    ),
    
    selectSkillCardById: (state, id: string) => 
      state.cards.find(card => card.id === id),
    
    selectUserCreatedSkills: (state) => state.createdSkills,
  },
});

export const { 
  addCreatedSkill, 
  removeCreatedSkill,
  addUserSkillCard,
  updateUserSkillCard,
  removeUserSkillCard,
} = skillsSlice.actions;

export const { 
  selectAllSkillCards, 
  selectCreatedSkills,
  selectUserSkillCards,
  selectSkillCardById,
  selectUserCreatedSkills,
} = skillsSlice.selectors;