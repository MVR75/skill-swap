export type TCheckboxTreeOption = {
  value: string;
  label: string;
};

export type TCheckboxTreeUIProps = {
  name: string;
  label: string;
  options: TCheckboxTreeOption[];
  value: string[];
  onChange: (value: string[]) => void;
};
