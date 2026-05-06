export type TRadioGroupProps = {
  legend?: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
};
