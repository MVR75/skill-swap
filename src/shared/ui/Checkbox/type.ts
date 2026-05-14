export type TCheckboxProps = {
  label: string;
  checked: boolean;
  name: string;
  value: string;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};
