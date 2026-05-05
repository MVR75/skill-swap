export type TRadioUIProps = {
  children: React.ReactNode;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  className?: string;
};
