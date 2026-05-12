export type ErrorCode = 404 | 500;

export type ErrorPageProps = {
  code?: ErrorCode;
  title?: string;
  message?: string;
  onReportClick?: () => void;
  onHomeClick?: () => void;
};
