import type { Step1Data } from './steps/Step1/schema';
import type { Step2Data } from './steps/Step2/schema';
import type { Step3Data } from './steps/Step3/schema';

export type { Step2Data, Step3Data };

export type RegisterFormData = Step1Data & Step2Data & Step3Data;
