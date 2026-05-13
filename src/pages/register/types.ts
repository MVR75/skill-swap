import type { Step1Data } from './steps/Step1/schema';
import type { Step2Data } from './steps/Step2/schema';

export type { Step2Data };

export type Step3Data = Record<string, unknown>;

export type RegisterFormData = Step1Data & Step2Data & Step3Data;
