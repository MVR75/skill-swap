type TActiveFilterType = 'gender' | 'skillExchangeIntent' | 'city' | 'skill' | 'search'; // <-- ДОБАВЛЯЕМ 'search'

export type TActiveFilterItem = {
  type: TActiveFilterType;
  value: string;
  label: string;
};

export type TDeleteFilterPayload = Omit<TActiveFilterItem, 'label'>;