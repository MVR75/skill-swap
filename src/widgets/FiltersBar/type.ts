import type { TCheckboxGroupUIProps } from "../../shared/ui/CheckboxGroup/type";
import type { TRadioGroupProps } from "../../shared/ui/RadioGroup/type";

export type TFiltersBarUIProps = {
  skillExchangeIntentFilter: TRadioGroupProps;
  skillsFilter: TCheckboxGroupUIProps;
  genderFilter: TRadioGroupProps;
  cityFilter: TCheckboxGroupUIProps;
  filterCount: number;
  onClear: () => void;
};
