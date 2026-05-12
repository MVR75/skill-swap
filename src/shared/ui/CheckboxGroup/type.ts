import type { TCheckboxTreeOption } from "../CheckboxTree/type";

export type TCheckboxGroupOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type TCheckboxGroupBaseProps = {
  name: string;
  legend?: string;
};

type TCheckboxGroupNormalProps = TCheckboxGroupBaseProps & {
  type: 'normal';
  options: TCheckboxGroupOption[];
  value: string[];
  onChange: (value: string[]) => void;
};

type TCheckboxGroupTreeProps = TCheckboxGroupBaseProps & {
  type: 'tree';
  trees: Array<{
    name: string;
    label: string;
    options: TCheckboxTreeOption[];
    value: string[];
    onChange: (value: string[]) => void;
  }>;
};

export type TCheckboxGroupUIProps =
  | TCheckboxGroupNormalProps
  | TCheckboxGroupTreeProps;
